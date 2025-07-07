'use client';

import { useState } from 'react';
import { 
  Heart, 
  Users, 
  School, 
  Target, 
  Calendar, 
  Award,
  Share2,
  ExternalLink,
  Mail,
  Phone
} from 'lucide-react';
import { SchoolProject, WildlifeSanctuary, FundraisingCampaign } from '@/types';

interface FundraisingCardProps {
  campaign: FundraisingCampaign;
  onDonate?: (campaignId: string) => void;
  onShare?: (campaignId: string) => void;
}

export function FundraisingCard({ campaign, onDonate, onShare }: FundraisingCardProps) {
  const progress = (campaign.raisedAmount / campaign.targetAmount) * 100;
  const daysLeft = Math.max(0, Math.ceil((campaign.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{campaign.title}</h3>
          <div className="text-right text-sm text-gray-500">
            <div>{daysLeft} days left</div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{campaign.description}</p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-900">
              ${campaign.raisedAmount.toLocaleString()} raised
            </span>
            <span className="text-gray-600">
              ${campaign.targetAmount.toLocaleString()} goal
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{progress.toFixed(1)}% funded</span>
            <span>{campaign.donorCount} donors</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onDonate?.(campaign.id)}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Heart className="w-4 h-4" />
            <span>Donate</span>
          </button>
          <button
            onClick={() => onShare?.(campaign.id)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface SchoolProjectCardProps {
  project: SchoolProject;
  onSupport?: (projectId: string) => void;
  onContact?: (projectId: string) => void;
}

export function SchoolProjectCard({ project, onSupport, onContact }: SchoolProjectCardProps) {
  const progress = (project.fundraisingRaised / project.fundraisingGoal) * 100;
  const statusColors = {
    planning: 'bg-yellow-100 text-yellow-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    paused: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
      {project.images.length > 0 && (
        <img 
          src={project.images[0]} 
          alt={project.projectTitle}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.projectTitle}</h3>
            <p className="text-sm text-gray-600">{project.schoolName}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

        {/* Project Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">{project.students.count}</div>
            <div className="text-xs text-gray-600">Students</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              ${project.fundraisingRaised.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">Raised</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">{project.impact.communityReach}</div>
            <div className="text-xs text-gray-600">Community Reach</div>
          </div>
        </div>

        {/* Fundraising Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Fundraising Progress</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Target Species */}
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Target className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Target Species</span>
          </div>
          <p className="text-sm text-green-800">{project.targetSpecies.commonName}</p>
          <p className="text-xs text-green-600 italic">{project.targetSpecies.scientificName}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onSupport?.(project.id)}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Heart className="w-4 h-4" />
            <span>Support</span>
          </button>
          <button
            onClick={() => onContact?.(project.id)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface SanctuaryCardProps {
  sanctuary: WildlifeSanctuary;
  onDonate?: (sanctuaryId: string) => void;
  onVolunteer?: (sanctuaryId: string) => void;
  onVisit?: (sanctuaryId: string) => void;
}

export function SanctuaryCard({ sanctuary, onDonate, onVolunteer, onVisit }: SanctuaryCardProps) {
  const donationProgress = sanctuary.donationRaised && sanctuary.donationGoal 
    ? (sanctuary.donationRaised / sanctuary.donationGoal) * 100 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
      {sanctuary.images.length > 0 && (
        <img 
          src={sanctuary.images[0]} 
          alt={sanctuary.name}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{sanctuary.name}</h3>
          <p className="text-sm text-gray-600">{sanctuary.location.region}, {sanctuary.location.country}</p>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{sanctuary.description}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">{sanctuary.speciesCount}</div>
            <div className="text-xs text-gray-600">Total Species</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">{sanctuary.endangeredSpecies.length}</div>
            <div className="text-xs text-gray-600">Endangered</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">{sanctuary.area.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Hectares</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">{sanctuary.establishedYear}</div>
            <div className="text-xs text-gray-600">Established</div>
          </div>
        </div>

        {/* Donation Progress */}
        {sanctuary.donationGoal && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Funding Progress</span>
              <span>${sanctuary.donationRaised?.toLocaleString()} / ${sanctuary.donationGoal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(donationProgress, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Programs */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-900 mb-2">Programs Available</p>
          <div className="flex flex-wrap gap-1">
            {sanctuary.programs.education && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Education</span>
            )}
            {sanctuary.programs.volunteer && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Volunteer</span>
            )}
            {sanctuary.programs.research && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Research</span>
            )}
            {sanctuary.programs.breeding && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Breeding</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <div className="flex space-x-2">
            <button
              onClick={() => onDonate?.(sanctuary.id)}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Heart className="w-4 h-4" />
              <span>Donate</span>
            </button>
            <button
              onClick={() => onVolunteer?.(sanctuary.id)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Volunteer</span>
            </button>
          </div>
          <button
            onClick={() => onVisit?.(sanctuary.id)}
            className="w-full border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Visit Website</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface EducationalResourcesProps {
  targetSpecies?: string;
  ageGroup?: string;
}

export function EducationalResources({ targetSpecies, ageGroup }: EducationalResourcesProps) {
  const [selectedTab, setSelectedTab] = useState<'activities' | 'resources' | 'projects'>('activities');

  const activities = [
    {
      title: 'Species Research Project',
      description: 'Students research endangered species in their region',
      ageGroup: 'All ages',
      duration: '2-3 weeks',
      difficulty: 'Medium'
    },
    {
      title: 'Habitat Diorama Creation',
      description: 'Build 3D models of animal habitats and threats',
      ageGroup: '8-14 years',
      duration: '1 week',
      difficulty: 'Easy'
    },
    {
      title: 'Conservation Campaign',
      description: 'Create awareness campaigns for local wildlife',
      ageGroup: '12+ years',
      duration: '3-4 weeks',
      difficulty: 'Hard'
    }
  ];

  const resources = [
    {
      title: 'Species Fact Sheets',
      type: 'PDF Downloads',
      description: 'Detailed information about endangered species'
    },
    {
      title: 'Interactive Presentations',
      type: 'PowerPoint',
      description: 'Ready-to-use classroom presentations'
    },
    {
      title: 'Activity Worksheets',
      type: 'Printable',
      description: 'Hands-on activities and assessments'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Educational Resources</h3>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setSelectedTab('activities')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'activities' 
              ? 'bg-white text-green-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Activities
        </button>
        <button
          onClick={() => setSelectedTab('resources')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'resources' 
              ? 'bg-white text-green-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Resources
        </button>
        <button
          onClick={() => setSelectedTab('projects')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'projects' 
              ? 'bg-white text-green-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Projects
        </button>
      </div>

      {/* Tab Content */}
      {selectedTab === 'activities' && (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {activity.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
              <div className="flex space-x-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{activity.ageGroup}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{activity.duration}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'resources' && (
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{resource.title}</h4>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {resource.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
              <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors">
                Download
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'projects' && (
        <div className="text-center py-8">
          <School className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-medium text-gray-900 mb-2">Start Your Own Project</h4>
          <p className="text-sm text-gray-600 mb-4">
            Get step-by-step guidance to launch a conservation project at your school
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Get Started
          </button>
        </div>
      )}
    </div>
  );
}
