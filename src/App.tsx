/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, CareerDetail, UserIntakeProfile } from './types';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { HeroSection } from './components/HeroSection';
import { BentoGrid } from './components/BentoGrid';
import { CareerExplorer } from './components/CareerExplorer';
import { RoadmapGenerator } from './components/RoadmapGenerator';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { FieldsView } from './components/FieldsView';
import { MentorAIView } from './components/MentorAIView';
import { OpportunityHub } from './components/OpportunityHub';
import { ProfileView } from './components/ProfileView';
import { SampleRoadmapModal } from './components/SampleRoadmapModal';
import { PivotSimulatorModal } from './components/PivotSimulatorModal';
import { IntakeModal } from './components/IntakeModal';
import { SomeoneLikeMeSection } from './components/SomeoneLikeMeSection';
import { SubmitContributionModal } from './components/SubmitContributionModal';
import { ClickPopEffect } from './components/ClickPopEffect';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('hub');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSampleRoadmapOpen, setIsSampleRoadmapOpen] = useState(false);
  const [isPivotModalOpen, setIsPivotModalOpen] = useState(false);
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [intakeInitialCareer, setIntakeInitialCareer] = useState<string | undefined>(undefined);
  const [activeMentorQuery, setActiveMentorQuery] = useState<string | undefined>(undefined);

  // Active user intake profile state
  const [userProfile, setUserProfile] = useState<UserIntakeProfile>({
    currentStage: 'SS3 / Writing WAEC or NECO',
    careerAmbition: 'Medical Laboratory Science',
    favoriteSubjects: ['Biology', 'Chemistry', 'Physics', 'English'],
    realWorldConstraint: 'Low or unpredictable UTME / JAMB cut-off marks',
    studyPreference: 'Federal or State University',
    targetInstitution: 'University of Ilorin',
    targetInstitutionId: 'unilorin',
    academicSession: '2026/2027'
  });

  const handleGoToMentor = (query?: string) => {
    setActiveMentorQuery(query);
    setCurrentTab('mentor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenIntake = (career?: string) => {
    setIntakeInitialCareer(career);
    setIsIntakeModalOpen(true);
  };

  const handleCompleteIntake = (profile: UserIntakeProfile) => {
    setUserProfile(profile);
  };

  const handleScrollToBuilder = () => {
    if (currentTab !== 'hub') {
      setCurrentTab('hub');
      setTimeout(() => {
        const el = document.getElementById('builder');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('builder');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCareerForRoadmap = (career: CareerDetail) => {
    handleOpenIntake(career.title);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-body selection:bg-[#dc2626] selection:text-white">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSampleRoadmap={() => setIsSampleRoadmapOpen(true)}
        onOpenIntakeModal={() => handleOpenIntake()}
      />

      {/* Slide-in Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectTab={setCurrentTab}
        onOpenSampleRoadmap={() => setIsSampleRoadmapOpen(true)}
        onOpenPivotModal={() => setIsPivotModalOpen(true)}
        onOpenIntakeModal={() => handleOpenIntake()}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-[#fbf9f5]">
        {currentTab === 'hub' && (
          <div className="flex flex-col w-full">
            {/* Hero Section */}
            <HeroSection
              onScrollToBuilder={handleScrollToBuilder}
              onOpenSampleRoadmap={() => setIsSampleRoadmapOpen(true)}
              onOpenIntakeModal={() => handleOpenIntake()}
            />

            {/* Bento Grid: Built for Nigeria */}
            <BentoGrid
              onOpenPivotModal={() => setIsPivotModalOpen(true)}
            />

            {/* In-Demand Careers Explorer */}
            <CareerExplorer
              onSelectCareerForRoadmap={handleSelectCareerForRoadmap}
            />

            {/* Instant Career Generator */}
            <RoadmapGenerator
              onGoToMentorAI={handleGoToMentor}
              onOpenSampleRoadmap={() => setIsSampleRoadmapOpen(true)}
              onOpenIntakeModal={() => handleOpenIntake()}
            />

            {/* "Someone Like Me" Mentorship Proof Section on Hub */}
            <div className="px-4 max-w-5xl mx-auto w-full mb-6">
              <SomeoneLikeMeSection
                careerAmbition={userProfile.careerAmbition}
                onGoToMentorAI={handleGoToMentor}
              />
            </div>

            {/* Footer */}
            <Footer
              onSelectTab={setCurrentTab}
              onOpenPivotModal={() => setIsPivotModalOpen(true)}
              onOpenSampleRoadmap={() => setIsSampleRoadmapOpen(true)}
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            />
          </div>
        )}

        {currentTab === 'fields' && (
          <div className="flex flex-col w-full">
            <FieldsView
              onOpenPivotModal={() => setIsPivotModalOpen(true)}
              onGoToMentorAI={handleGoToMentor}
            />
            <Footer
              onSelectTab={setCurrentTab}
              onOpenPivotModal={() => setIsPivotModalOpen(true)}
              onOpenSampleRoadmap={() => setIsSampleRoadmapOpen(true)}
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            />
          </div>
        )}

        {currentTab === 'mentor' && (
          <MentorAIView
            initialQuery={activeMentorQuery}
            onOpenPivotModal={() => setIsPivotModalOpen(true)}
            onOpenSampleRoadmap={() => setIsSampleRoadmapOpen(true)}
          />
        )}

        {currentTab === 'grants' && (
          <div className="flex flex-col w-full">
            <OpportunityHub
              onGoToMentorAI={handleGoToMentor}
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            />
            <Footer
              onSelectTab={setCurrentTab}
              onOpenPivotModal={() => setIsPivotModalOpen(true)}
              onOpenSampleRoadmap={() => setIsSampleRoadmapOpen(true)}
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            />
          </div>
        )}

        {currentTab === 'profile' && (
          <div className="flex flex-col w-full">
            <ProfileView
              onGoToMentorAI={handleGoToMentor}
              onOpenPivotModal={() => setIsPivotModalOpen(true)}
              onOpenSampleRoadmap={() => setIsSampleRoadmapOpen(true)}
              userProfile={userProfile}
              onOpenIntakeModal={() => handleOpenIntake()}
            />
            <Footer
              onSelectTab={setCurrentTab}
              onOpenPivotModal={() => setIsPivotModalOpen(true)}
              onOpenSampleRoadmap={() => setIsSampleRoadmapOpen(true)}
              onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Bottom Fixed Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
      />

      {/* Sample Roadmap Modal */}
      <SampleRoadmapModal
        isOpen={isSampleRoadmapOpen}
        onClose={() => setIsSampleRoadmapOpen(false)}
        onGoToMentorAI={handleGoToMentor}
      />

      {/* JAMB Cut-Off Pivot Simulator Modal */}
      <PivotSimulatorModal
        isOpen={isPivotModalOpen}
        onClose={() => setIsPivotModalOpen(false)}
        onGoToMentorAI={handleGoToMentor}
      />

      {/* Tell Us About You - Conversational Micro-Card Stepper Intake Modal */}
      <IntakeModal
        isOpen={isIntakeModalOpen}
        onClose={() => setIsIntakeModalOpen(false)}
        onComplete={handleCompleteIntake}
        onGoToMentorAI={handleGoToMentor}
        onExploreOpportunities={() => setCurrentTab('grants')}
        initialCareer={intakeInitialCareer}
      />

      {/* Community Contribution Modal */}
      <SubmitContributionModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      {/* Global Interactive Click Pop-up Animation Effect */}
      <ClickPopEffect />
    </div>
  );
}
