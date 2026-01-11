'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  LOCATION_OPTIONS,
  checkQualification,
  setQualificationStatus,
  type QualificationAnswers,
} from '@/lib/qualification';

interface QualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (qualified: boolean) => void;
}

export default function QualificationModal({ isOpen, onClose, onComplete }: QualificationModalProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QualificationAnswers>({
    budget: '',
    timeline: '',
    locations: [],
  });
  const [showRejection, setShowRejection] = useState(false);

  const handleBudgetSelect = (value: string) => {
    setAnswers({ ...answers, budget: value });
  };

  const handleTimelineSelect = (value: string) => {
    setAnswers({ ...answers, timeline: value });
  };

  const handleLocationToggle = (value: string) => {
    const locations = answers.locations.includes(value)
      ? answers.locations.filter((l) => l !== value)
      : [...answers.locations, value];
    setAnswers({ ...answers, locations });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final step - check qualification
      const qualified = checkQualification(answers);
      setQualificationStatus(qualified, answers);

      if (qualified) {
        onComplete(true);
        handleClose();
      } else {
        setShowRejection(true);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    // Reset state on close
    setStep(1);
    setAnswers({ budget: '', timeline: '', locations: [] });
    setShowRejection(false);
    onClose();
  };

  const canProceed = () => {
    if (step === 1) return answers.budget !== '';
    if (step === 2) return answers.timeline !== '';
    if (step === 3) return answers.locations.length > 0;
    return false;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6 md:p-8">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {showRejection ? (
            // Soft Rejection View
            <div className="text-center">
              <h2 className="heading-3 mb-4">
                Thanks for your interest
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                My concierge service is designed for buyers ready to purchase
                within the next 12 months with budgets starting at $500,000.
              </p>

              <p className="text-gray-600 mb-6">
                In the meantime, you might find these resources helpful:
              </p>

              <div className="space-y-3">
                <Link
                  href="/how-buying-works"
                  className="block w-full btn-secondary"
                  onClick={handleClose}
                >
                  Learn How Buying Works
                </Link>
                <Link
                  href="/insights/why-i-guide-buyers-in-guanacaste"
                  className="block w-full btn-outline"
                  onClick={handleClose}
                >
                  Read About Guanacaste
                </Link>
              </div>

              <button
                onClick={handleClose}
                className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
              >
                Close
              </button>
            </div>
          ) : (
            // Qualification Steps
            <>
              {/* Progress indicator */}
              <div className="flex justify-center space-x-2 mb-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      step >= i ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Step 1: Budget */}
              {step === 1 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    To make sure I can help you effectively...
                  </p>
                  <h2 className="heading-3 mb-6">
                    What's your approximate budget?
                  </h2>

                  <div className="space-y-3">
                    {BUDGET_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleBudgetSelect(option.value)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                          answers.budget === option.value
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-medium text-gray-900">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Timeline */}
              {step === 2 && (
                <div>
                  <h2 className="heading-3 mb-6">
                    When are you looking to buy?
                  </h2>

                  <div className="space-y-3">
                    {TIMELINE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleTimelineSelect(option.value)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                          answers.timeline === option.value
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-medium text-gray-900">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Location */}
              {step === 3 && (
                <div>
                  <h2 className="heading-3 mb-4">
                    Which areas interest you?
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">Select all that apply</p>

                  <div className="space-y-3">
                    {LOCATION_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleLocationToggle(option.value)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                          answers.locations.includes(option.value)
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{option.label}</span>
                          {answers.locations.includes(option.value) && (
                            <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="btn-primary px-6 py-2.5 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{step === 3 ? 'Continue' : 'Next'}</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
