# WildTrace AWS Deployment Guide

**Cost-Optimized AWS App Runner Deployment for Sample Projects**

This guide provides a streamlined, cost-effective deployment process for the WildTrace wildlife conservation tracking application using AWS App Runner. Perfect for sample projects, portfolios, and low-traffic applications with fewer than 5 users.

## 🎯 Why This Approach?

**AWS App Runner** is the most cost-effective choice for sample projects:
- **Pay-per-use pricing**: Only pay when your app receives requests
- **Automatic scaling**: Scales to zero when not in use  
- **Built-in HTTPS**: Free SSL certificates included
- **No infrastructure management**: Fully managed service
- **Estimated cost**: $5-15 USD per month

## 🏗️ Architecture Overview

**Simple and Cost-Effective:**
- **AWS App Runner**: Containerized application hosting
- **Amazon ECR**: Docker image registry
- **CloudWatch**: Basic logging and monitoring
- **No VPC, NAT Gateway, or Load Balancer costs**

## 📋 Prerequisites

Before deploying, ensure you have:

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **Docker** installed and running
4. **Node.js 18+** and npm

### Required AWS Permissions

Your AWS user/role needs permissions for:
- App Runner (create, update, delete services)
- ECR (Elastic Container Registry)
- CloudWatch (Logs)
- IAM (for service roles)

### Quick Permission Setup

Create an IAM policy with these permissions:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "apprunner:*",
                "ecr:*",
                "logs:*",
                "iam:PassRole",
                "iam:CreateServiceLinkedRole"
            ],
            "Resource": "*"
        }
    ]
}
```

## 🚀 One-Command Deployment

### 1. Clone and Setup

```bash
git clone <repository-url>
cd WildTrace
npm install
```

### 2. Configure Environment Variables

```bash
# Copy environment template
cp .env.prod.template .env.prod

# Edit with your values
nano .env.prod
```

**Required environment variables:**
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
GBIF_API_KEY=your_gbif_key (optional)
IUCN_API_KEY=your_iucn_key (optional)
```

### 3. Deploy to AWS

```bash
# Deploy with default AWS profile and us-east-1 region
./scripts/deploy.sh

# Or specify profile and region
./scripts/deploy.sh my-aws-profile us-west-2
```

**That's it!** The script will:
- ✅ Check prerequisites and AWS credentials
- ✅ Create ECR repository with cost-optimization policies
- ✅ Build and push optimized Docker image
- ✅ Create or update App Runner service
- ✅ Provide deployment summary and next steps

## 📊 Expected Costs

### Monthly Cost Breakdown (App Runner)
- **ECR Repository**: ~$0.10/month (for 2 images)
- **App Runner Service**: $0.007 per vCPU-hour + $0.000375 per GB-hour
- **CloudWatch Logs**: ~$0.50/month (basic logging)

### Usage Examples:
- **Light usage** (100 page views/day): ~$5-8/month
- **Moderate usage** (500 page views/day): ~$10-15/month
- **Zero usage** (scales to zero): ~$0.60/month (ECR storage only)

## 🔧 Post-Deployment Configuration

After deployment, you need to add environment variables via AWS Console:

### 1. Access App Runner Console
1. Go to AWS Console > App Runner
2. Select your service (wildtrace-prod)
3. Go to Configuration > Environment Variables

### 2. Add Environment Variables
Add the same variables from your `.env.prod` file:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
- `GBIF_API_KEY` (optional)
- `IUCN_API_KEY` (optional)

### 3. Redeploy Service
After adding environment variables, trigger a new deployment from the AWS console or run the deploy script again.

## 🔍 Monitoring and Debugging

### Application URL and Health Check
Your application will be available at:
- **Main URL**: `https://[random-id].us-east-1.awsapprunner.com`
- **Health Check**: `https://[random-id].us-east-1.awsapprunner.com/api/health`

### View Logs
```bash
# View real-time logs
aws logs tail /aws/apprunner/wildtrace-prod/[service-id]/application --follow

# Check service status
aws apprunner describe-service --service-arn [service-arn]
```

### Common Issues and Solutions

**1. Service Won't Start**
- Check CloudWatch logs for container errors
- Verify environment variables are set correctly
- Ensure health check endpoint `/api/health` is responding

**2. Build Failures**
```bash
# Test Docker build locally
docker build -t wildtrace-test .

# Check if all dependencies are included
docker run --rm wildtrace-test npm list
```

**3. Environment Variable Issues**
- Environment variables must be set in AWS App Runner console
- Variables in `.env` files are for local development only
- Restart the service after changing environment variables

## 💰 Cost Optimization Features

### Automatic Cost Savings
- **Auto-scaling to zero**: No charges when app isn't being used
- **ECR lifecycle policy**: Automatically deletes old images (keeps only 3 most recent)
- **Minimal instance size**: Uses smallest available resources (0.25 vCPU, 0.5 GB RAM)
- **No idle costs**: Unlike ECS Fargate, you don't pay for idle time

### Additional Cost Monitoring
Set up billing alerts:
```bash
# Create a $25 monthly budget
aws budgets create-budget --account-id $(aws sts get-caller-identity --query Account --output text) --budget '{
  "BudgetName": "WildTrace-Monthly-Budget",
  "BudgetLimit": {
    "Amount": "25",
    "Unit": "USD"
  },
  "TimeUnit": "MONTHLY",
  "BudgetType": "COST"
}'
```

## 🔄 Updating Your Application

### For Code Changes
```bash
# Simply run the deploy script again
./scripts/deploy.sh
```

The script will:
1. Build a new Docker image
2. Push it to ECR with a new timestamp tag
3. Trigger App Runner to deploy the new version
4. Wait for deployment to complete

### For Configuration Changes
- Update environment variables in AWS App Runner console
- Trigger a new deployment from the console or re-run deploy script

## 🧹 Cleanup and Cost Management

### Remove All Resources
```bash
# Delete App Runner service
aws apprunner delete-service --service-arn [service-arn]

# Delete ECR repository
aws ecr delete-repository --repository-name wildtrace-prod --force
```

### Temporary Shutdown
App Runner automatically scales to zero, so there's no need to manually stop the service. When not in use, you only pay for ECR image storage (~$0.60/month).

## 🔗 External Service Setup

### Free Tier Services for Cost Optimization

**Supabase (Database)**
- Free tier: 50,000 monthly active users
- 500 MB database storage
- 1 GB bandwidth per month

**Mapbox (Maps)**
- Free tier: 50,000 map loads per month
- Perfect for sample projects

**GBIF API**
- Completely free with rate limits
- No API key required for basic usage

**IUCN Red List API**
- Free for non-commercial use
- Register at: https://apiv3.iucnredlist.org/api/v3/token

## 🛠️ Development vs Production

### Local Development
```bash
# Use local environment
npm run dev

# Or with Docker
docker-compose up
```

### Production Deployment
- Always use the AWS App Runner deployment
- Environment variables managed in AWS console
- Automatic HTTPS and scaling

## 📞 Support and Troubleshooting

### Getting Help
1. **Check CloudWatch logs** for detailed error messages
2. **Test locally** with Docker to isolate issues
3. **Verify AWS credentials** and permissions
4. **Review environment variables** in AWS console

### Useful AWS Console Links
- **App Runner Services**: https://console.aws.amazon.com/apprunner/
- **ECR Repositories**: https://console.aws.amazon.com/ecr/
- **CloudWatch Logs**: https://console.aws.amazon.com/cloudwatch/home#logsV2:
- **Billing Dashboard**: https://console.aws.amazon.com/billing/

## 🎯 Best Practices for Sample Projects

1. **Use free tiers** of external services (Supabase, Mapbox, GBIF)
2. **Set up billing alerts** to avoid unexpected charges
3. **Monitor usage** through AWS Cost Explorer
4. **Clean up resources** when no longer needed
5. **Document your setup** for portfolio presentations

## 🌟 Next Steps

After successful deployment:

1. **Test thoroughly** in production environment
2. **Set up billing alerts** for cost monitoring
3. **Document your live URL** for portfolio/demo purposes
4. **Consider CI/CD** with GitHub Actions if frequent updates are needed
5. **Monitor performance** and optimize as needed

---

**🎉 Your WildTrace wildlife conservation platform is now live on AWS with minimal cost and maximum efficiency!**

For questions or issues, refer to the troubleshooting section above or check the application logs in CloudWatch.
