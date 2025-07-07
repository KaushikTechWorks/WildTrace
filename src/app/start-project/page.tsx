'use client';

import { useState } from 'react';
import { 
  School, 
  Users, 
  Target, 
  Calendar,
  MapPin,
  Heart,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  BookOpen,
  DollarSign,
  Award
} from 'lucide-react';
import { Species } from '@/types';

// Mock data for species selection
const availableSpecies: Species[] = [
  {
    id: '1',
    scientificName: 'Panthera tigris',
    commonName: 'Bengal Tiger',
    conservationStatus: 'EN',
    kingdom: 'Animalia',
    phylum: 'Chordata',
    class: 'Mammalia',
    order: 'Carnivora',
    family: 'Felidae',
    genus: 'Panthera',
    description: 'The Bengal tiger is a population of the Panthera tigris tigris subspecies.',
    threats: ['Habitat loss', 'Poaching', 'Human-wildlife conflict'],
    habitat: 'Tropical forests, grasslands, and mangroves',
    population: 2500,
    populationTrend: 'increasing',
    lastAssessed: new Date('2023-01-15'),
    imageUrl: '/images/bengal-tiger.jpg',
    iucnId: '15955',
    gbifId: '2435099',
    location: {
      latitude: 21.7679,
      longitude: 78.8718,
      region: 'Sundarbans',
      country: 'India',
      protectedArea: 'Sundarbans National Park'
    }
  },
  {
    id: '2',
    scientificName: 'Pongo abelii',
    commonName: 'Sumatran Orangutan',
    conservationStatus: 'CR',
    kingdom: 'Animalia',
    phylum: 'Chordata',
    class: 'Mammalia',
    order: 'Primates',
    family: 'Hominidae',
    genus: 'Pongo',
    description: 'The Sumatran orangutan is one of the three species of orangutans.',
    threats: ['Deforestation', 'Palm oil plantations', 'Illegal pet trade'],
    habitat: 'Tropical rainforests',
    population: 14000,
    populationTrend: 'decreasing',
    lastAssessed: new Date('2023-03-20'),
    imageUrl: '/images/sumatran-orangutan.jpg',
    iucnId: '39780',
    gbifId: '2436436',
    location: {
      latitude: 3.5952,
      longitude: 98.6722,
      region: 'Sumatra',
      country: 'Indonesia',
      protectedArea: 'Leuser National Park'
    }
  }
];

interface ProjectFormData {
  schoolName: string;
  projectTitle: string;
  description: string;
  teacherName: string;
  teacherEmail: string;
  studentCount: number;
  ageGroup: string;
  grade: string;
  fundraisingGoal: number;
  targetSpecies: string;
  projectDuration: string;
  activities: string[];
  city: string;
  state: string;
  country: string;
}

export default function StartSchoolProject() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProjectFormData>({
    schoolName: '',
    projectTitle: '',
    description: '',
    teacherName: '',
    teacherEmail: '',
    studentCount: 0,
    ageGroup: '',
    grade: '',
    fundraisingGoal: 0,
    targetSpecies: '',
    projectDuration: '',
    activities: [],
    city: '',
    state: '',
    country: ''
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Project submitted:', formData);
    alert('Project submitted successfully! We\'ll be in touch soon.');
  };

  const activityOptions = [
    'Species research presentations',
    'Art exhibition with endangered animals',
    'Bake sale fundraising',
    'Letter writing to government officials',
    'Community awareness campaign',
    'Habitat diorama creation',
    'Documentary screening',
    'Guest speaker from wildlife sanctuary',
    'School garden for pollinators',
    'Recycling drive to reduce threats'
  ];

  const getStepIcon = (step: number) => {
    if (step < currentStep) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (step === currentStep) return <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">{step}</div>;
    return <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold">{step}</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <a href="/" className="text-green-600 hover:text-green-700 mr-4">← Back to WildTrace</a>
            <div className="flex items-center space-x-3">
              <div className="conservation-gradient p-2 rounded-lg">
                <School className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Start a School Conservation Project</h1>
                <p className="text-sm text-gray-600">Inspire students to protect endangered species</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className="flex items-center">
                  {getStepIcon(step)}
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {step === 1 && 'School Info'}
                    {step === 2 && 'Project Details'}
                    {step === 3 && 'Species & Activities'}
                    {step === 4 && 'Review & Submit'}
                  </span>
                </div>
                {step < totalSteps && (
                  <div className={`ml-4 w-16 h-1 rounded ${step < currentStep ? 'bg-green-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          {/* Step 1: School Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">School Information</h2>
                <p className="text-gray-600">Let&apos;s start with basic information about your school and class.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your school name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teacher Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.teacherName}
                    onChange={(e) => setFormData({...formData, teacherName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teacher Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.teacherEmail}
                    onChange={(e) => setFormData({...formData, teacherEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="your.email@school.edu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Students <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.studentCount || ''}
                    onChange={(e) => setFormData({...formData, studentCount: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.ageGroup}
                    onChange={(e) => setFormData({...formData, ageGroup: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select age group</option>
                    <option value="5-8 years">5-8 years (Elementary)</option>
                    <option value="8-12 years">8-12 years (Middle Elementary)</option>
                    <option value="12-15 years">12-15 years (Middle School)</option>
                    <option value="15-18 years">15-18 years (High School)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., 5th Grade or 9th-10th Grade"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Province <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="State/Province"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Details</h2>
                <p className="text-gray-600">Tell us about your conservation project vision and goals.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({...formData, projectTitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"                    placeholder="e.g., &lsquo;Save the Tigers: Our Local Heroes&rsquo;"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Describe your project goals, what students will learn, and how you plan to help conservation efforts..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Duration <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.projectDuration}
                    onChange={(e) => setFormData({...formData, projectDuration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select duration</option>
                    <option value="2-4 weeks">2-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="One semester">One semester</option>
                    <option value="Full school year">Full school year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fundraising Goal (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.fundraisingGoal || ''}
                    onChange={(e) => setFormData({...formData, fundraisingGoal: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="1000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Suggested range: $500 - $5,000 depending on school size</p>
                </div>
              </div>

              {/* Inspiration Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">Project Ideas</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Research and present on a local endangered species</li>
                      <li>• Create art exhibitions featuring wildlife conservation</li>
                      <li>• Organize fundraising events for wildlife sanctuaries</li>
                      <li>• Write letters to local representatives about conservation</li>
                      <li>• Partner with a local zoo or wildlife center</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Species Selection & Activities */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Focus Species</h2>
                <p className="text-gray-600">Select an endangered species to focus your conservation efforts on.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableSpecies.map((species) => (
                  <div
                    key={species.id}
                    onClick={() => setFormData({...formData, targetSpecies: species.id})}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      formData.targetSpecies === species.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        species.conservationStatus === 'CR' ? 'bg-red-500' : 'bg-orange-500'
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{species.commonName}</h3>
                        <p className="text-sm italic text-gray-600">{species.scientificName}</p>
                        <p className="text-sm text-gray-600 mt-1">{species.description}</p>
                        <div className="mt-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            species.conservationStatus === 'CR' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {species.conservationStatus === 'CR' ? 'Critically Endangered' : 'Endangered'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Project Activities <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activityOptions.map((activity) => (
                    <label key={activity} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.activities.includes(activity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, activities: [...formData.activities, activity]});
                          } else {
                            setFormData({...formData, activities: formData.activities.filter(a => a !== activity)});
                          }
                        }}
                        className="text-green-600 rounded"
                      />
                      <span className="text-sm text-gray-700">{activity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Project</h2>
                <p className="text-gray-600">Please review all the information before submitting your project.</p>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">School Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">School:</span> {formData.schoolName}</div>
                    <div><span className="font-medium">Teacher:</span> {formData.teacherName}</div>
                    <div><span className="font-medium">Students:</span> {formData.studentCount}</div>
                    <div><span className="font-medium">Grade:</span> {formData.grade}</div>
                    <div><span className="font-medium">Location:</span> {formData.city}, {formData.state}, {formData.country}</div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Project Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Title:</span> {formData.projectTitle}</div>
                    <div><span className="font-medium">Duration:</span> {formData.projectDuration}</div>
                    <div><span className="font-medium">Fundraising Goal:</span> ${formData.fundraisingGoal?.toLocaleString()}</div>
                    <div><span className="font-medium">Description:</span> {formData.description}</div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Focus Species & Activities</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Target Species:</span> {
                      availableSpecies.find(s => s.id === formData.targetSpecies)?.commonName || 'Not selected'
                    }</div>
                    <div>
                      <span className="font-medium">Activities:</span>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {formData.activities.map((activity, index) => (
                          <li key={index}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-900 mb-1">What happens next?</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• We&apos;ll review your project within 2-3 business days</li>
                      <li>• You&apos;ll receive educational resources and project templates</li>
                      <li>• We&apos;ll connect you with relevant wildlife sanctuaries</li>
                      <li>• Your project will be featured on our platform to inspire others</li>
                      <li>• You&apos;ll get ongoing support throughout your project</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit}
                className="conservation-gradient text-white px-8 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Submit Project
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="conservation-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
