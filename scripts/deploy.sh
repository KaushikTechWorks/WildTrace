#!/bin/bash

# WildTrace - Complete AWS Deployment Script
# Consolidated, cost-optimized deployment for production environment
# Uses AWS App Runner for simple, scalable, and cost-effective hosting
#
# Usage: ./scripts/deploy.sh [aws-profile] [aws-region]
# Example: ./scripts/deploy.sh default us-east-1

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
AWS_PROFILE=${1:-default}
AWS_REGION=${2:-us-east-1}
ENVIRONMENT="prod"
APP_NAME="wildtrace"
SERVICE_NAME="${APP_NAME}-${ENVIRONMENT}"
ECR_REPO_NAME="${APP_NAME}-${ENVIRONMENT}"

# Project banner
echo -e "${CYAN}🦎 WildTrace - Wildlife Conservation Tracking Platform${NC}"
echo -e "${BLUE}🚀 Complete AWS App Runner Deployment (Cost-Optimized)${NC}"
echo ""
echo -e "${YELLOW}📋 Configuration:${NC}"
echo -e "   AWS Profile:     ${AWS_PROFILE}"
echo -e "   AWS Region:      ${AWS_REGION}"
echo -e "   Environment:     ${ENVIRONMENT}"
echo -e "   Service Name:    ${SERVICE_NAME}"
echo -e "   💰 Expected Cost: $5-15/month (pay-per-use)"
echo ""

#==============================================================================
# PREREQUISITE CHECKS
#==============================================================================

echo -e "${BLUE}🔍 Checking prerequisites...${NC}"

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed.${NC}"
    echo -e "${YELLOW}   Install with: brew install awscli${NC}"
    echo -e "${YELLOW}   Or visit: https://aws.amazon.com/cli/${NC}"
    exit 1
fi

# Check Docker
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker is not running.${NC}"
    echo -e "${YELLOW}   Please start Docker and try again.${NC}"
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed.${NC}"
    echo -e "${YELLOW}   Please install Node.js 18+ from: https://nodejs.org/${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -c 2-)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo -e "${RED}❌ Node.js version $NODE_VERSION is too old. Required: 18+${NC}"
    exit 1
fi

# Install jq if available for better JSON parsing
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  jq not found. Installing for better JSON parsing...${NC}"
    if command -v brew &> /dev/null; then
        brew install jq
    else
        echo -e "${YELLOW}   Please install jq manually for better output formatting${NC}"
    fi
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

#==============================================================================
# AWS AUTHENTICATION
#==============================================================================

# Set AWS profile
export AWS_PROFILE=$AWS_PROFILE

echo -e "${BLUE}🔐 Verifying AWS credentials...${NC}"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text 2>/dev/null)
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to get AWS account ID. Please check your AWS credentials.${NC}"
    echo -e "${YELLOW}   Run: aws configure --profile ${AWS_PROFILE}${NC}"
    exit 1
fi

AWS_USER=$(aws sts get-caller-identity --query Arn --output text 2>/dev/null | cut -d'/' -f2)
echo -e "${GREEN}✅ AWS Account: ${AWS_ACCOUNT_ID} (${AWS_USER})${NC}"

#==============================================================================
# PROJECT SETUP
#==============================================================================

# Navigate to project root
cd "$(dirname "$0")/.."

echo -e "${BLUE}📦 Setting up project dependencies...${NC}"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}   Installing application dependencies...${NC}"
    npm install
else
    echo -e "${GREEN}   Dependencies already installed${NC}"
fi

# Environment file setup
ENV_FILE=".env.${ENVIRONMENT}"
ENV_TEMPLATE=".env.${ENVIRONMENT}.template"

if [ ! -f "$ENV_FILE" ]; then
    if [ -f "$ENV_TEMPLATE" ]; then
        echo -e "${YELLOW}⚠️  Creating environment file from template...${NC}"
        cp "$ENV_TEMPLATE" "$ENV_FILE"
        echo -e "${YELLOW}   📝 Please edit ${ENV_FILE} with your actual values:${NC}"
        echo -e "${YELLOW}      • NEXT_PUBLIC_SUPABASE_URL${NC}"
        echo -e "${YELLOW}      • NEXT_PUBLIC_SUPABASE_ANON_KEY${NC}"
        echo -e "${YELLOW}      • SUPABASE_SERVICE_ROLE_KEY${NC}"
        echo -e "${YELLOW}      • NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN${NC}"
        echo -e "${YELLOW}      • GBIF_API_KEY (optional)${NC}"
        echo -e "${YELLOW}      • IUCN_API_KEY (optional)${NC}"
        echo ""
        read -p "Press Enter when you've updated the environment file..." -r
    else
        echo -e "${YELLOW}⚠️  No environment template found. Continuing without local env file.${NC}"
        echo -e "${YELLOW}      You'll need to set environment variables in AWS App Runner console.${NC}"
    fi
else
    echo -e "${GREEN}   Environment file exists: ${ENV_FILE}${NC}"
fi

#==============================================================================
# ECR REPOSITORY SETUP
#==============================================================================

ECR_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"

echo -e "${BLUE}📦 Setting up ECR repository...${NC}"

aws ecr describe-repositories --repository-names ${ECR_REPO_NAME} --region ${AWS_REGION} &> /dev/null || {
    echo -e "${YELLOW}   Creating ECR repository: ${ECR_REPO_NAME}${NC}"
    aws ecr create-repository \
        --repository-name ${ECR_REPO_NAME} \
        --image-scanning-configuration scanOnPush=true \
        --region ${AWS_REGION} \
        --no-cli-pager > /dev/null
    
    # Set lifecycle policy to keep costs low (only keep last 3 images)
    echo -e "${YELLOW}   Setting cost-optimization lifecycle policy...${NC}"
    aws ecr put-lifecycle-configuration \
        --repository-name ${ECR_REPO_NAME} \
        --region ${AWS_REGION} \
        --lifecycle-policy-text '{
            "rules": [
                {
                    "rulePriority": 1,
                    "description": "Keep last 3 images only to minimize storage costs",
                    "selection": {
                        "tagStatus": "any",
                        "countType": "imageCountMoreThan",
                        "countNumber": 3
                    },
                    "action": {
                        "type": "expire"
                    }
                }
            ]
        }' \
        --no-cli-pager > /dev/null
}

echo -e "${GREEN}✅ ECR repository ready: ${ECR_URI}${NC}"

#==============================================================================
# DOCKER BUILD AND PUSH
#==============================================================================

# Login to ECR
echo -e "${BLUE}🔐 Authenticating with ECR...${NC}"
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_URI}

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ ECR authentication failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ ECR authentication successful${NC}"

# Build Docker image
echo -e "${BLUE}🏗️  Building optimized Docker image...${NC}"

# Use AWS-optimized Dockerfile if it exists, otherwise use default
DOCKERFILE="Dockerfile"
if [ -f "Dockerfile.aws" ]; then
    DOCKERFILE="Dockerfile.aws"
    echo -e "${YELLOW}   Using: ${DOCKERFILE} (AWS-optimized)${NC}"
else
    echo -e "${YELLOW}   Using: ${DOCKERFILE} (default)${NC}"
fi

docker build -f ${DOCKERFILE} -t ${SERVICE_NAME}:latest . --quiet

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

# Tag image with timestamp for versioning
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
docker tag ${SERVICE_NAME}:latest ${ECR_URI}:latest
docker tag ${SERVICE_NAME}:latest ${ECR_URI}:${ENVIRONMENT}-${TIMESTAMP}

echo -e "${GREEN}✅ Docker image built and tagged${NC}"

# Push image to ECR
echo -e "${BLUE}📤 Pushing image to ECR...${NC}"
echo -e "${YELLOW}   Pushing latest tag...${NC}"
docker push ${ECR_URI}:latest --quiet

echo -e "${YELLOW}   Pushing versioned tag (${ENVIRONMENT}-${TIMESTAMP})...${NC}"
docker push ${ECR_URI}:${ENVIRONMENT}-${TIMESTAMP} --quiet

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to push image to ECR${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Image pushed successfully to ECR${NC}"

#==============================================================================
# APP RUNNER SERVICE DEPLOYMENT
#==============================================================================

# Check if App Runner service exists
echo -e "${BLUE}🔍 Checking for existing App Runner service...${NC}"
SERVICE_EXISTS=$(aws apprunner list-services --region ${AWS_REGION} --query "ServiceSummaryList[?ServiceName=='${SERVICE_NAME}'].ServiceName" --output text 2>/dev/null)

if [ -z "$SERVICE_EXISTS" ]; then
    echo -e "${BLUE}🚀 Creating new App Runner service...${NC}"
    echo -e "${YELLOW}   Service: ${SERVICE_NAME}${NC}"
    echo -e "${YELLOW}   CPU: 0.25 vCPU (lowest cost tier)${NC}"
    echo -e "${YELLOW}   Memory: 0.5 GB (lowest cost tier)${NC}"
    
    # Create App Runner service with cost-optimized settings
    aws apprunner create-service \
        --service-name ${SERVICE_NAME} \
        --source-configuration '{
            "ImageRepository": {
                "ImageIdentifier": "'${ECR_URI}':latest",
                "ImageConfiguration": {
                    "Port": "3000",
                    "RuntimeEnvironmentVariables": {
                        "NODE_ENV": "production",
                        "PORT": "3000"
                    }
                },
                "ImageRepositoryType": "ECR"
            },
            "AutoDeploymentsEnabled": false
        }' \
        --instance-configuration '{
            "Cpu": "0.25 vCPU",
            "Memory": "0.5 GB"
        }' \
        --health-check-configuration '{
            "Protocol": "HTTP",
            "Path": "/api/health",
            "Interval": 10,
            "Timeout": 5,
            "HealthyThreshold": 1,
            "UnhealthyThreshold": 5
        }' \
        --region ${AWS_REGION} \
        --no-cli-pager > /dev/null
    
    echo -e "${YELLOW}⏳ Waiting for service creation (this may take 3-5 minutes)...${NC}"
    
    # Get the service ARN for waiting
    SERVICE_ARN=$(aws apprunner list-services --region ${AWS_REGION} --query "ServiceSummaryList[?ServiceName=='${SERVICE_NAME}'].ServiceArn" --output text)
    
    # Wait for service to be created
    aws apprunner wait service-created --service-arn ${SERVICE_ARN} --region ${AWS_REGION}
    
    echo -e "${GREEN}✅ App Runner service created successfully${NC}"
    
else
    echo -e "${BLUE}🔄 Updating existing App Runner service...${NC}"
    
    SERVICE_ARN=$(aws apprunner list-services --region ${AWS_REGION} --query "ServiceSummaryList[?ServiceName=='${SERVICE_NAME}'].ServiceArn" --output text)
    
    echo -e "${YELLOW}   Triggering new deployment with latest image...${NC}"
    aws apprunner start-deployment \
        --service-arn ${SERVICE_ARN} \
        --region ${AWS_REGION} \
        --no-cli-pager > /dev/null
    
    echo -e "${YELLOW}⏳ Waiting for deployment to complete (this may take 3-5 minutes)...${NC}"
    aws apprunner wait deployment-successful --service-arn ${SERVICE_ARN} --region ${AWS_REGION}
    
    echo -e "${GREEN}✅ App Runner service updated successfully${NC}"
fi

#==============================================================================
# POST-DEPLOYMENT
#==============================================================================

# Get service details
echo -e "${BLUE}📊 Retrieving service information...${NC}"

SERVICE_ARN=$(aws apprunner list-services --region ${AWS_REGION} --query "ServiceSummaryList[?ServiceName=='${SERVICE_NAME}'].ServiceArn" --output text)
SERVICE_DETAILS=$(aws apprunner describe-service --service-arn ${SERVICE_ARN} --region ${AWS_REGION} --query 'Service' 2>/dev/null)

SERVICE_URL=$(echo $SERVICE_DETAILS | jq -r '.ServiceUrl' 2>/dev/null || aws apprunner describe-service --service-arn ${SERVICE_ARN} --region ${AWS_REGION} --query 'Service.ServiceUrl' --output text)
SERVICE_STATUS=$(echo $SERVICE_DETAILS | jq -r '.Status' 2>/dev/null || aws apprunner describe-service --service-arn ${SERVICE_ARN} --region ${AWS_REGION} --query 'Service.Status' --output text)

# Clean up local Docker images to save space
echo -e "${BLUE}🧹 Cleaning up local Docker images...${NC}"
docker rmi ${SERVICE_NAME}:latest ${ECR_URI}:latest ${ECR_URI}:${ENVIRONMENT}-${TIMESTAMP} 2>/dev/null || true

#==============================================================================
# DEPLOYMENT SUMMARY
#==============================================================================

echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo -e "${CYAN}📋 Deployment Summary:${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "🏷️  Service Name:     ${SERVICE_NAME}"
echo -e "🌐 Application URL:   https://${SERVICE_URL}"
echo -e "📍 AWS Region:       ${AWS_REGION}"
echo -e "📊 Service Status:    ${SERVICE_STATUS}"
echo -e "🏗️  Image Version:    ${ENVIRONMENT}-${TIMESTAMP}"
echo -e "💰 Monthly Cost:     ~$5-15 USD (pay-per-use)"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ "$SERVICE_STATUS" = "RUNNING" ]; then
    echo -e "${GREEN}✅ Your WildTrace application is live and ready!${NC}"
    echo -e "${BLUE}🌐 Visit: https://${SERVICE_URL}${NC}"
    echo -e "${BLUE}🔗 Health Check: https://${SERVICE_URL}/api/health${NC}"
else
    echo -e "${YELLOW}⚠️  Service is ${SERVICE_STATUS}. It may take a few more minutes to be fully ready.${NC}"
fi

echo ""
echo -e "${BLUE}🔧 Next Steps:${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "1. 🔑 Add environment variables via AWS Console:"
echo -e "   👉 AWS Console > App Runner > ${SERVICE_NAME} > Configuration > Environment Variables"
echo ""
echo -e "2. 📝 Required environment variables:"
echo -e "   • NEXT_PUBLIC_SUPABASE_URL"
echo -e "   • NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo -e "   • SUPABASE_SERVICE_ROLE_KEY"
echo -e "   • NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN"
echo -e "   • GBIF_API_KEY (optional)"
echo -e "   • IUCN_API_KEY (optional)"
echo ""
echo -e "3. 🧪 Test your application thoroughly"
echo -e "4. 💰 Set up AWS billing alerts for cost monitoring"
echo -e "5. 📈 Monitor your application via AWS Console > App Runner > ${SERVICE_NAME}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${BLUE}💡 Cost Optimization Features:${NC}"
echo -e "• App Runner scales to zero when not in use (saves money!)"
echo -e "• ECR lifecycle policy keeps only 3 most recent images"
echo -e "• Uses smallest instance size (0.25 vCPU, 0.5 GB RAM)"
echo -e "• Pay-per-use pricing model"
echo ""

echo -e "${BLUE}📊 Useful Commands:${NC}"
echo -e "• View logs:     aws logs tail /aws/apprunner/${SERVICE_NAME}/${SERVICE_ARN##*/}/application --follow"
echo -e "• Redeploy:      ./scripts/deploy.sh ${AWS_PROFILE} ${AWS_REGION}"
echo -e "• Check status:  aws apprunner describe-service --service-arn ${SERVICE_ARN}"
echo ""

echo -e "${GREEN}🎯 Deployment complete! Happy wildlife conservation! 🦎🌍🔬${NC}"
