import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import NotificationPanel from "./NotificationPanel";
import ProfileMenu from "./ProfileMenu";
import AIKnowledgeAssistant from "./AIKnowledgeAssistant";

import "./DashboardComponents.css";

const DashboardLayout = ({
  children,
  role = "Employee",
  pageTitle = "Dashboard",
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [aiOpen, setAiOpen] = useState(true);

  const [aiExpanded, setAiExpanded] =
    useState(false);

  useEffect(() => {
    const handleProfileToggle = () => {
      setProfileOpen((previous) => !previous);
      setNotificationsOpen(false);
    };

    window.addEventListener(
      "dashboard-profile-toggle",
      handleProfileToggle
    );

    return () => {
      window.removeEventListener(
        "dashboard-profile-toggle",
        handleProfileToggle
      );
    };
  }, []);

  const handleNotificationToggle = () => {
    setNotificationsOpen((previous) => !previous);
    setProfileOpen(false);
  };

  return (
    <div className="dashboard-shell dashboard-component">
      <Sidebar
        role={role}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onToggle={() =>
          setSidebarCollapsed((previous) => !previous)
        }
        onMobileClose={() =>
          setMobileSidebarOpen(false)
        }
      />

      <main className="dashboard-main">
        <TopHeader
          pageTitle={pageTitle}
          onSidebarToggle={() =>
            setSidebarCollapsed((previous) => !previous)
          }
          onMobileSidebarToggle={() =>
            setMobileSidebarOpen((previous) => !previous)
          }
          onNotificationToggle={handleNotificationToggle}
          notificationCount={6}
        />

        <section className="dashboard-content">
          {children}
        </section>
      </main>

      {notificationsOpen && (
        <NotificationPanel
          onClose={() =>
            setNotificationsOpen(false)
          }
        />
      )}

      {profileOpen && (
        <ProfileMenu
          onClose={() =>
            setProfileOpen(false)
          }
        />
      )}

      {aiOpen && (
        <AIKnowledgeAssistant
          expanded={aiExpanded}
          onExpand={() => setAiExpanded(true)}
          onCollapse={() => setAiExpanded(false)}
          onClose={() => setAiOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;