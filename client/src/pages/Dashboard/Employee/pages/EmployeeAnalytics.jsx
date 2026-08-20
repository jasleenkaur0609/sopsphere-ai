import React, { useMemo, useState } from "react";
import {
  FaChartLine,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaTasks,
  FaGraduationCap,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
} from "react-icons/fa";

import "./EmployeeAnalytics.css";

const EmployeeAnalytics = ({ profile }) => {
  const [period, setPeriod] = useState("This Month");

  const employeeName =
    profile?.name ||
    profile?.fullName ||
    "Employee";

  const analyticsData = {
    "This Week": {
      sopViews: 18,
      completedTasks: 9,
      trainingProgress: 62,
      compliance: 94,
      productivity: 87,
    },
    "This Month": {
      sopViews: 74,
      completedTasks: 32,
      trainingProgress: 78,
      compliance: 96,
      productivity: 91,
    },
    "Last 3 Months": {
      sopViews: 196,
      completedTasks: 87,
      trainingProgress: 84,
      compliance: 97,
      productivity: 93,
    },
  };

  const currentData = useMemo(
    () => analyticsData[period],
    [period]
  );

  const activityData = [
    {
      label: "SOP Usage",
      value: currentData.sopViews,
      change: "+12%",
      trend: "up",
      icon: <FaFileAlt />,
    },
    {
      label: "Tasks Completed",
      value: currentData.completedTasks,
      change: "+8%",
      trend: "up",
      icon: <FaTasks />,
    },
    {
      label: "Training Progress",
      value: `${currentData.trainingProgress}%`,
      change: "+6%",
      trend: "up",
      icon: <FaGraduationCap />,
    },
    {
      label: "Compliance Score",
      value: `${currentData.compliance}%`,
      change: "+2%",
      trend: "up",
      icon: <FaCheckCircle />,
    },
  ];

  const weeklyPerformance = [
    { day: "Mon", value: 72 },
    { day: "Tue", value: 84 },
    { day: "Wed", value: 68 },
    { day: "Thu", value: 91 },
    { day: "Fri", value: 87 },
    { day: "Sat", value: 76 },
    { day: "Sun", value: 64 },
  ];

  const recentActivity = [
    {
      title: "Completed SOP review",
      type: "SOP",
      date: "Today, 10:42 AM",
      status: "Completed",
    },
    {
      title: "Completed compliance training",
      type: "Training",
      date: "Yesterday, 4:15 PM",
      status: "Completed",
    },
    {
      title: "Updated assigned task",
      type: "Task",
      date: "Yesterday, 11:20 AM",
      status: "Updated",
    },
    {
      title: "Viewed Knowledge SOP",
      type: "SOP",
      date: "Aug 18, 2026",
      status: "Viewed",
    },
  ];

  return (
    <div className="employee-analytics-page">

      {/* Header */}
      <header className="employee-analytics-header">

        <div className="employee-analytics-title">

          <div className="employee-analytics-title-icon">
            <FaChartLine />
          </div>

          <div>
            <span className="employee-analytics-eyebrow">
              PERFORMANCE INSIGHTS
            </span>

            <h1>My Analytics</h1>

            <p>
              Track your activity, productivity, learning,
              and compliance performance.
            </p>
          </div>

        </div>

        <div className="employee-analytics-period">

          <FaCalendarAlt />

          <select
            value={period}
            onChange={(event) =>
              setPeriod(event.target.value)
            }
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>Last 3 Months</option>
          </select>

        </div>

      </header>


      {/* Welcome / Productivity Summary */}
      <section className="employee-analytics-summary">

        <div>
          <span>EMPLOYEE PERFORMANCE</span>

          <h2>
            Good progress, {employeeName}
          </h2>

          <p>
            Your overall productivity score is currently
            {` ${currentData.productivity}%`}.
            Keep completing tasks and learning activities
            to maintain your performance.
          </p>
        </div>

        <div className="employee-analytics-score">

          <div className="employee-analytics-score-circle">
            <strong>
              {currentData.productivity}%
            </strong>

            <span>
              Productivity
            </span>
          </div>

        </div>

      </section>


      {/* KPI Cards */}
      <section className="employee-analytics-kpis">

        {activityData.map((item) => (
          <div
            className="employee-analytics-kpi"
            key={item.label}
          >

            <div className="employee-analytics-kpi-top">

              <div className="employee-analytics-kpi-icon">
                {item.icon}
              </div>

              <span className="employee-analytics-kpi-change">
                <FaArrowUp />
                {item.change}
              </span>

            </div>

            <span className="employee-analytics-kpi-label">
              {item.label}
            </span>

            <strong>
              {item.value}
            </strong>

          </div>
        ))}

      </section>


      {/* Main Analytics */}
      <section className="employee-analytics-main">

        {/* Performance Chart */}
        <div className="employee-analytics-chart-card">

          <div className="employee-analytics-section-header">

            <div>
              <span>WEEKLY PERFORMANCE</span>

              <h2>Activity Overview</h2>
            </div>

            <FaChartLine />

          </div>

          <div className="employee-analytics-chart">

            {weeklyPerformance.map((item) => (
              <div
                className="employee-analytics-bar-column"
                key={item.day}
              >

                <div className="employee-analytics-bar-wrapper">

                  <div
                    className="employee-analytics-bar"
                    style={{
                      height: `${item.value}%`,
                    }}
                    title={`${item.value}%`}
                  />

                </div>

                <span>
                  {item.day}
                </span>

              </div>
            ))}

          </div>

        </div>


        {/* Performance Breakdown */}
        <div className="employee-analytics-breakdown">

          <div className="employee-analytics-section-header">

            <div>
              <span>PERFORMANCE BREAKDOWN</span>

              <h2>Key Areas</h2>
            </div>

            <FaTasks />

          </div>


          <div className="employee-analytics-breakdown-item">

            <div>
              <span>Productivity</span>
              <strong>
                {currentData.productivity}%
              </strong>
            </div>

            <div className="employee-analytics-progress">
              <div
                style={{
                  width: `${currentData.productivity}%`,
                }}
              />
            </div>

          </div>


          <div className="employee-analytics-breakdown-item">

            <div>
              <span>Compliance</span>
              <strong>
                {currentData.compliance}%
              </strong>
            </div>

            <div className="employee-analytics-progress">
              <div
                style={{
                  width: `${currentData.compliance}%`,
                }}
              />
            </div>

          </div>


          <div className="employee-analytics-breakdown-item">

            <div>
              <span>Training</span>
              <strong>
                {currentData.trainingProgress}%
              </strong>
            </div>

            <div className="employee-analytics-progress">
              <div
                style={{
                  width: `${currentData.trainingProgress}%`,
                }}
              />
            </div>

          </div>

        </div>

      </section>


      {/* Recent Activity */}
      <section className="employee-analytics-activity">

        <div className="employee-analytics-section-header">

          <div>
            <span>RECENT ACTIVITY</span>

            <h2>Activity History</h2>
          </div>

          <FaClock />

        </div>


        <div className="employee-analytics-activity-list">

          {recentActivity.map((activity) => (
            <div
              className="employee-analytics-activity-row"
              key={`${activity.title}-${activity.date}`}
            >

              <div className="employee-analytics-activity-icon">
                {activity.type === "Training" ? (
                  <FaGraduationCap />
                ) : activity.type === "Task" ? (
                  <FaTasks />
                ) : (
                  <FaFileAlt />
                )}
              </div>


              <div className="employee-analytics-activity-info">

                <strong>
                  {activity.title}
                </strong>

                <span>
                  {activity.type} • {activity.date}
                </span>

              </div>


              <span className="employee-analytics-activity-status">
                {activity.status}
              </span>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
};

export default EmployeeAnalytics;