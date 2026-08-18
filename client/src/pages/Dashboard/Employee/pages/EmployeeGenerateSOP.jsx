import React, { useState } from "react";
import {
  FaMagic,
  FaFileAlt,
  FaBuilding,
  FaLayerGroup,
  FaAlignLeft,
  FaRobot,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaLightbulb,
  FaTimes,
} from "react-icons/fa";

import "./EmployeeGenerateSOP.css";

const EmployeeGenerateSOP = ({ profile }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    category: "",
    purpose: "",
    description: "",
    instructions: "",
    tone: "Professional",
    detailLevel: "Detailed",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  /*
   * =========================================================
   * FORM OPTIONS
   * =========================================================
   */

  const departments = [
    "Engineering",
    "Technology",
    "Operations",
    "Finance",
    "Human Resources",
    "Sales",
    "Marketing",
    "Compliance",
    "Information Security",
    "Other",
  ];

  const categories = [
    "Business Operations",
    "IT & Technology",
    "Human Resources",
    "Finance",
    "Compliance",
    "Information Security",
    "Sales & Marketing",
    "Customer Service",
    "Other",
  ];

  const toneOptions = [
    "Professional",
    "Formal",
    "Simple & Clear",
    "Technical",
  ];

  const detailOptions = [
    "Brief",
    "Standard",
    "Detailed",
    "Highly Detailed",
  ];

  /*
   * =========================================================
   * FORM HANDLER
   * =========================================================
   */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /*
   * =========================================================
   * STEP VALIDATION
   * =========================================================
   */

  const canContinueFromStepOne =
    formData.title.trim() &&
    formData.department &&
    formData.category;

  const canContinueFromStepTwo =
    formData.purpose.trim() &&
    formData.description.trim();

  /*
   * =========================================================
   * NEXT STEP
   * =========================================================
   */

  const handleNext = () => {
    if (step === 1 && !canContinueFromStepOne) {
      return;
    }

    if (step === 2 && !canContinueFromStepTwo) {
      return;
    }

    setStep((current) => Math.min(current + 1, 3));
  };

  /*
   * =========================================================
   * PREVIOUS STEP
   * =========================================================
   */

  const handleBack = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  /*
   * =========================================================
   * GENERATE SOP
   * =========================================================
   */

  const handleGenerate = () => {
    if (isGenerating) return;

    setIsGenerating(true);

    /*
     * Temporary frontend simulation.
     *
     * This will later be replaced with the actual
     * AI SOP generation API.
     */

    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 1500);
  };

  /*
   * =========================================================
   * RESET
   * =========================================================
   */

  const handleReset = () => {
    setStep(1);

    setFormData({
      title: "",
      department: "",
      category: "",
      purpose: "",
      description: "",
      instructions: "",
      tone: "Professional",
      detailLevel: "Detailed",
    });

    setIsGenerated(false);
    setIsGenerating(false);
  };

  /*
   * =========================================================
   * RENDER STEP INDICATOR
   * =========================================================
   */

  const renderStepIndicator = () => {
    const steps = [
      {
        number: 1,
        title: "Basic Information",
      },
      {
        number: 2,
        title: "SOP Details",
      },
      {
        number: 3,
        title: "AI Configuration",
      },
    ];

    return (
      <div className="employee-generate-sop-stepper">

        {steps.map((item, index) => {

          const completed = step > item.number;
          const active = step === item.number;

          return (
            <React.Fragment key={item.number}>

              <div
                className={`employee-generate-sop-step ${
                  active
                    ? "employee-generate-sop-step-active"
                    : ""
                } ${
                  completed
                    ? "employee-generate-sop-step-completed"
                    : ""
                }`}
              >

                <div className="employee-generate-sop-step-number">

                  {completed ? (
                    <FaCheck />
                  ) : (
                    item.number
                  )}

                </div>

                <span>
                  {item.title}
                </span>

              </div>

              {index < steps.length - 1 && (
                <div
                  className={`employee-generate-sop-step-line ${
                    step > item.number
                      ? "employee-generate-sop-step-line-completed"
                      : ""
                  }`}
                />
              )}

            </React.Fragment>
          );
        })}

      </div>
    );
  };

  /*
   * =========================================================
   * GENERATED STATE
   * =========================================================
   */

  if (isGenerated) {
    return (
      <div className="employee-generate-sop-page">

        <div className="employee-generate-sop-generated">

          <div className="employee-generate-sop-generated-icon">
            <FaCheck />
          </div>

          <span className="employee-generate-sop-eyebrow">
            AI SOP GENERATION
          </span>

          <h1>
            SOP Ready for Review
          </h1>

          <p>
            Your SOP has been generated based on the
            information and AI configuration you provided.
          </p>


          <div className="employee-generate-sop-generated-card">

            <div className="employee-generate-sop-generated-card-icon">
              <FaFileAlt />
            </div>

            <div>

              <strong>
                {formData.title}
              </strong>

              <span>
                {formData.department}
                {" • "}
                {formData.category}
              </span>

            </div>

          </div>


          <div className="employee-generate-sop-generated-actions">

            <button
              type="button"
              className="employee-generate-sop-primary-action"
              onClick={() =>
                console.log(
                  "Open generated SOP"
                )
              }
            >
              <FaFileAlt />

              <span>
                Review Generated SOP
              </span>

            </button>


            <button
              type="button"
              className="employee-generate-sop-secondary-action"
              onClick={handleReset}
            >
              <FaMagic />

              <span>
                Generate Another SOP
              </span>

            </button>

          </div>

        </div>

      </div>
    );
  }

  /*
   * =========================================================
   * MAIN PAGE
   * =========================================================
   */

  return (
    <div className="employee-generate-sop-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="employee-generate-sop-header">

        <div className="employee-generate-sop-title-wrapper">

          <div className="employee-generate-sop-title-icon">
            <FaMagic />
          </div>

          <div>

            <span className="employee-generate-sop-eyebrow">
              AI POWERED WORKSPACE
            </span>

            <h1>
              Generate SOP
            </h1>

            <p>
              Create a structured Standard Operating
              Procedure using AI assistance.
            </p>

          </div>

        </div>

      </header>


      {/* =====================================================
          STEPPER
      ===================================================== */}

      {renderStepIndicator()}


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="employee-generate-sop-content">

        <section className="employee-generate-sop-form-card">

          {/* =================================================
              STEP 1
          ================================================= */}

          {step === 1 && (
            <div className="employee-generate-sop-form-section">

              <div className="employee-generate-sop-section-header">

                <div className="employee-generate-sop-section-icon">
                  <FaFileAlt />
                </div>

                <div>

                  <h2>
                    Basic Information
                  </h2>

                  <p>
                    Start by providing the basic information
                    about the SOP you want to create.
                  </p>

                </div>

              </div>


              <div className="employee-generate-sop-form-grid">

                <div className="employee-generate-sop-field employee-generate-sop-field-full">

                  <label>
                    SOP Title
                    <span>*</span>
                  </label>

                  <div className="employee-generate-sop-input-wrapper">

                    <FaFileAlt />

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter the SOP title"
                    />

                  </div>

                </div>


                <div className="employee-generate-sop-field">

                  <label>
                    Department
                    <span>*</span>
                  </label>

                  <div className="employee-generate-sop-select-wrapper">

                    <FaBuilding />

                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select department
                      </option>

                      {departments.map(
                        (department) => (
                          <option
                            key={department}
                            value={department}
                          >
                            {department}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>


                <div className="employee-generate-sop-field">

                  <label>
                    SOP Category
                    <span>*</span>
                  </label>

                  <div className="employee-generate-sop-select-wrapper">

                    <FaLayerGroup />

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select category
                      </option>

                      {categories.map(
                        (category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>

              </div>

            </div>
          )}


          {/* =================================================
              STEP 2
          ================================================= */}

          {step === 2 && (
            <div className="employee-generate-sop-form-section">

              <div className="employee-generate-sop-section-header">

                <div className="employee-generate-sop-section-icon">
                  <FaAlignLeft />
                </div>

                <div>

                  <h2>
                    SOP Details
                  </h2>

                  <p>
                    Provide context and requirements so AI
                    can generate a useful SOP.
                  </p>

                </div>

              </div>


              <div className="employee-generate-sop-form-grid">

                <div className="employee-generate-sop-field employee-generate-sop-field-full">

                  <label>
                    Purpose
                    <span>*</span>
                  </label>

                  <textarea
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="What is the purpose of this SOP?"
                    rows={4}
                  />

                </div>


                <div className="employee-generate-sop-field employee-generate-sop-field-full">

                  <label>
                    Process Description
                    <span>*</span>
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the process that this SOP should cover..."
                    rows={5}
                  />

                </div>


                <div className="employee-generate-sop-field employee-generate-sop-field-full">

                  <label>
                    Additional Instructions
                  </label>

                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="Add any specific steps, rules, exceptions or requirements..."
                    rows={5}
                  />

                </div>

              </div>

            </div>
          )}


          {/* =================================================
              STEP 3
          ================================================= */}

          {step === 3 && (
            <div className="employee-generate-sop-form-section">

              <div className="employee-generate-sop-section-header">

                <div className="employee-generate-sop-section-icon">
                  <FaRobot />
                </div>

                <div>

                  <h2>
                    AI Configuration
                  </h2>

                  <p>
                    Configure how AI should structure and
                    present your generated SOP.
                  </p>

                </div>

              </div>


              <div className="employee-generate-sop-ai-info">

                <FaLightbulb />

                <div>

                  <strong>
                    AI Generation Tip
                  </strong>

                  <p>
                    More process details and specific
                    requirements generally produce a more
                    useful SOP draft.
                  </p>

                </div>

              </div>


              <div className="employee-generate-sop-form-grid">

                <div className="employee-generate-sop-field">

                  <label>
                    Writing Tone
                  </label>

                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleChange}
                  >

                    {toneOptions.map((tone) => (
                      <option
                        key={tone}
                        value={tone}
                      >
                        {tone}
                      </option>
                    ))}

                  </select>

                </div>


                <div className="employee-generate-sop-field">

                  <label>
                    Detail Level
                  </label>

                  <select
                    name="detailLevel"
                    value={formData.detailLevel}
                    onChange={handleChange}
                  >

                    {detailOptions.map(
                      (detail) => (
                        <option
                          key={detail}
                          value={detail}
                        >
                          {detail}
                        </option>
                      )
                    )}

                  </select>

                </div>


                <div className="employee-generate-sop-field employee-generate-sop-field-full">

                  <label>
                    Generation Summary
                  </label>

                  <div className="employee-generate-sop-summary">

                    <div>
                      <span>
                        SOP Title
                      </span>

                      <strong>
                        {formData.title ||
                          "Not provided"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Department
                      </span>

                      <strong>
                        {formData.department ||
                          "Not selected"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Category
                      </span>

                      <strong>
                        {formData.category ||
                          "Not selected"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Tone
                      </span>

                      <strong>
                        {formData.tone}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Detail Level
                      </span>

                      <strong>
                        {formData.detailLevel}
                      </strong>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

        </section>


        {/* ===================================================
            SIDE INFORMATION
        =================================================== */}

        <aside className="employee-generate-sop-sidebar">

          <div className="employee-generate-sop-help-card">

            <div className="employee-generate-sop-help-icon">
              <FaRobot />
            </div>

            <h3>
              AI SOP Assistant
            </h3>

            <p>
              AI will use your information to create a
              structured SOP draft that can be reviewed
              and refined before publishing.
            </p>

            <div className="employee-generate-sop-help-points">

              <div>
                <FaCheck />
                <span>
                  Structured process steps
                </span>
              </div>

              <div>
                <FaCheck />
                <span>
                  Roles and responsibilities
                </span>
              </div>

              <div>
                <FaCheck />
                <span>
                  Required controls
                </span>
              </div>

              <div>
                <FaCheck />
                <span>
                  Exceptions and notes
                </span>
              </div>

            </div>

          </div>


          <div className="employee-generate-sop-security-card">

            <FaLightbulb />

            <div>

              <strong>
                Before you generate
              </strong>

              <span>
                Make sure the process description contains
                enough information for the AI to understand
                the expected workflow.
              </span>

            </div>

          </div>

        </aside>

      </main>


      {/* =====================================================
          FOOTER ACTIONS
      ===================================================== */}

      <footer className="employee-generate-sop-actions">

        <button
          type="button"
          className="employee-generate-sop-back-button"
          onClick={handleBack}
          disabled={step === 1 || isGenerating}
        >

          <FaArrowLeft />

          <span>
            Back
          </span>

        </button>


        <div className="employee-generate-sop-action-right">

          {step < 3 ? (

            <button
              type="button"
              className="employee-generate-sop-next-button"
              onClick={handleNext}
              disabled={
                (step === 1 &&
                  !canContinueFromStepOne) ||
                (step === 2 &&
                  !canContinueFromStepTwo)
              }
            >

              <span>
                Continue
              </span>

              <FaArrowRight />

            </button>

          ) : (

            <button
              type="button"
              className="employee-generate-sop-generate-button"
              onClick={handleGenerate}
              disabled={isGenerating}
            >

              {isGenerating ? (
                <>
                  <span className="employee-generate-sop-spinner" />

                  <span>
                    Generating SOP...
                  </span>
                </>
              ) : (
                <>
                  <FaMagic />

                  <span>
                    Generate SOP
                  </span>

                  <FaArrowRight />
                </>
              )}

            </button>

          )}

        </div>

      </footer>

    </div>
  );
};

export default EmployeeGenerateSOP;