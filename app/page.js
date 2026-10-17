"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Briefcase,
  Users2,
  Search,
  Plus,
  Send,
  Star,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import Avatar from "@/components/Avatar";
import StatusBadge from "@/components/StatusBadge";
import DealCard, { formatMoney } from "@/components/DealCard";
import CreatorCard from "@/components/CreatorCard";
import Modal from "@/components/Modal";
import Toast from "@/components/Toast";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ToolSprawl from "@/components/ToolSprawl";
import FeatureStage from "@/components/FeatureStage";
import WorkflowSection from "@/components/WorkflowSection";
import RoiCalculator from "@/components/RoiCalculator";
import ComparisonTable from "@/components/ComparisonTable";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import { Instagram, Youtube } from "@/components/Icons";
import { NICHES, CREATORS, INITIAL_OFFERS, INITIAL_APPLICATIONS } from "@/lib/seedData";

const NICHE_EMOJIS = {
  Fashion: "👗",
  Fitness: "🏋️",
  Food: "🍳",
  Tech: "💻",
  Travel: "✈️",
  Beauty: "✨",
  Gaming: "🎮",
  Finance: "📈",
  Comedy: "🎭",
};

const CURRENT_CREATOR_ID = "inf-1"; // Aanya Kapoor

export default function Home() {
  // Theme State
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("roster_theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("roster_theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  // Live Deal Platform Persona State
  const [role, setRole] = useState("brand"); // "brand" | "creator"
  const [brandTab, setBrandTab] = useState("find"); // "find" | "campaigns"
  const [creatorTab, setCreatorTab] = useState("browse"); // "browse" | "applications" | "profile"

  // Core Data States
  const [offers, setOffers] = useState(INITIAL_OFFERS);
  const [creators, setCreators] = useState(CREATORS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Modals & Forms
  const [applyModalOffer, setApplyModalOffer] = useState(null);
  const [pitchText, setPitchText] = useState("");
  const [proposedRate, setProposedRate] = useState("");

  const [inviteModalCreator, setInviteModalCreator] = useState(null);
  const [inviteCampaignId, setInviteCampaignId] = useState("");

  const [newCampaignModal, setNewCampaignModal] = useState(false);
  const [ncTitle, setNcTitle] = useState("");
  const [ncNiche, setNcNiche] = useState(NICHES[0]);
  const [ncMin, setNcMin] = useState("");
  const [ncMax, setNcMax] = useState("");
  const [ncDeliverables, setNcDeliverables] = useState("");

  // Feedback Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Filtered Creators for Brands
  const filteredCreators = useMemo(() => {
    let result = creators.filter((c) => {
      if (selectedNiche !== "All" && c.niche !== selectedNiche) return false;
      if (selectedPlatform !== "All" && c.platform !== selectedPlatform) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesHandle = c.handle.toLowerCase().includes(q);
        const matchesCity = c.city?.toLowerCase().includes(q);
        const matchesBio = c.bio?.toLowerCase().includes(q);
        if (!matchesName && !matchesHandle && !matchesCity && !matchesBio) return false;
      }
      return true;
    });

    if (sortBy === "followers") {
      result.sort((a, b) => b.followers - a.followers);
    } else if (sortBy === "engagement") {
      result.sort((a, b) => b.engagement - a.engagement);
    } else if (sortBy === "rate-low") {
      result.sort((a, b) => a.rate - b.rate);
    } else if (sortBy === "rate-high") {
      result.sort((a, b) => b.rate - a.rate);
    }

    return result;
  }, [creators, selectedNiche, selectedPlatform, searchQuery, sortBy]);

  // Offers classification
  const brandOwnedOffers = useMemo(() => offers.filter((o) => o.mine), [offers]);
  const openMarketOffers = useMemo(() => offers.filter((o) => !o.mine), [offers]);

  // Filtered Deals for Creators
  const filteredMarketOffers = useMemo(() => {
    return openMarketOffers.filter((o) => {
      if (selectedNiche !== "All" && o.niche !== selectedNiche) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = o.title.toLowerCase().includes(q);
        const matchesBrand = (o.brand || "").toLowerCase().includes(q);
        const matchesDeliverables = (o.deliverables || "").toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesDeliverables) return false;
      }
      return true;
    });
  }, [openMarketOffers, selectedNiche, searchQuery]);

  // Applications submitted by current creator
  const creatorApplications = useMemo(
    () => applications.filter((a) => a.influencerId === CURRENT_CREATOR_ID),
    [applications]
  );

  // Application Handlers
  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyModalOffer || !pitchText.trim() || !proposedRate.trim()) return;

    const newApp = {
      id: `app-${Date.now()}`,
      offerId: applyModalOffer.id,
      influencerId: CURRENT_CREATOR_ID,
      status: "Applied",
      pitch: pitchText.trim(),
      rate: Number(proposedRate),
      createdAt: new Date().toISOString(),
    };

    setApplications((prev) => [newApp, ...prev]);
    showToast(`Application for "${applyModalOffer.title}" sent successfully! 🚀`);
    setApplyModalOffer(null);
    setPitchText("");
    setProposedRate("");
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteModalCreator || !inviteCampaignId) return;

    const targetOffer = offers.find((o) => o.id === inviteCampaignId);

    const newApp = {
      id: `app-${Date.now()}`,
      offerId: inviteCampaignId,
      influencerId: inviteModalCreator.id,
      status: "Invited",
      pitch: "Direct invitation from brand campaign manager.",
      rate: inviteModalCreator.rate,
      createdAt: new Date().toISOString(),
    };

    setApplications((prev) => [newApp, ...prev]);
    showToast(`Invitation sent to ${inviteModalCreator.name} for ${targetOffer?.title || "campaign"}! ⭐`);
    setInviteModalCreator(null);
    setInviteCampaignId("");
  };

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!ncTitle.trim() || !ncMin || !ncMax || !ncDeliverables.trim()) return;

    const newOffer = {
      id: `off-${Date.now()}`,
      brand: "Glowly Skincare",
      mine: true,
      title: ncTitle.trim(),
      niche: ncNiche,
      budgetMin: Number(ncMin),
      budgetMax: Number(ncMax),
      deliverables: ncDeliverables.trim(),
      days: 14,
      createdAt: new Date().toISOString(),
    };

    setOffers((prev) => [newOffer, ...prev]);
    showToast(`New campaign "${ncTitle}" published live to marketplace! 🎉`);
    setNewCampaignModal(false);
    setNcTitle("");
    setNcMin("");
    setNcMax("");
    setNcDeliverables("");
  };

  const handleUpdateApplicationStatus = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );
    showToast(`Applicant status updated to "${newStatus}"! ✨`);
  };

  return (
    <div>
      {/* Toast Feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* WorksBuddy Floating Navigation Bar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onSelectRole={(r, t) => {
          setRole(r);
          if (r === "brand") setBrandTab(t);
          else setCreatorTab(t);
        }}
        onSelectNiche={(n) => {
          setSelectedNiche(n);
          setRole("brand");
          setBrandTab("find");
        }}
      />

      {/* Hero with Rotating Badge & Stacked Mockups */}
      <HeroSection />

      {/* Problem / Tool Sprawl Section */}
      <ToolSprawl />

      {/* Interactive Features Stage */}
      <FeatureStage />

      {/* 5-Step Connected Workflow */}
      <WorkflowSection />

      {/* Interactive Campaign ROI Estimator */}
      <RoiCalculator />

      {/* Modern Advantage Comparison Matrix */}
      <ComparisonTable />

      {/* ============================================================== */}
      {/* THE LIVE PLATFORM APP WORKSPACE                                */}
      {/* ============================================================== */}
      <section id="app-workspace" style={{ padding: "80px 0" }}>
        <div className="w">
          <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 36px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--or)",
                backgroundColor: "var(--orb)",
                padding: "4px 14px",
                borderRadius: "99px",
                display: "inline-block",
                marginBottom: "12px",
              }}
            >
              ⚡ Interactive Workspace
            </span>
            <h2 style={{ fontSize: "clamp(32px, 4.5vw, 54px)", marginBottom: "14px" }}>
              Experience the Deal Operating System
            </h2>
            <p style={{ color: "var(--mu)", fontSize: "18px" }}>
              Toggle between the <strong>Brand Portal</strong> and <strong>Creator Hub</strong> below to submit pitches, publish briefs, shortlist applicants, and search verified creators.
            </p>
          </div>

          {/* Persona Switcher Tab Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              backgroundColor: "var(--card)",
              border: "1px solid var(--ln)",
              borderRadius: "20px",
              marginBottom: "28px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button
                onClick={() => setRole("brand")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 20px",
                  borderRadius: "14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  backgroundColor: role === "brand" ? "var(--btn)" : "transparent",
                  color: role === "brand" ? "var(--btnt)" : "var(--mu)",
                }}
              >
                <Briefcase size={16} />
                <span>Brand Portal</span>
              </button>

              <button
                onClick={() => setRole("creator")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 20px",
                  borderRadius: "14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  backgroundColor: role === "creator" ? "var(--btn)" : "transparent",
                  color: role === "creator" ? "var(--btnt)" : "var(--mu)",
                }}
              >
                <Users2 size={16} />
                <span>Creator Hub</span>
              </button>
            </div>

            {/* Current Persona Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {role === "brand" ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>
                      Glowly Skincare
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--mu)", fontFamily: "var(--font-mono)" }}>
                      Active Brand
                    </div>
                  </div>
                  <Avatar name="Glowly Skincare" size={36} />
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>
                      Aanya Kapoor
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--mu)", fontFamily: "var(--font-mono)" }}>
                      @aanya.styles
                    </div>
                  </div>
                  <Avatar name="Aanya Kapoor" size={36} />
                </div>
              )}
            </div>
          </div>

          {/* ================= BRAND VIEW ================= */}
          {role === "brand" && (
            <div>
              {/* Brand Sub Tabs */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => setBrandTab("find")}
                    className={`b ${brandTab === "find" ? "d" : ""}`}
                    style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "99px" }}
                  >
                    Discover Creators ({filteredCreators.length})
                  </button>
                  <button
                    onClick={() => setBrandTab("campaigns")}
                    className={`b ${brandTab === "campaigns" ? "d" : ""}`}
                    style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "99px" }}
                  >
                    My Campaigns ({brandOwnedOffers.length})
                  </button>
                </div>

                {brandTab === "campaigns" && (
                  <button
                    onClick={() => setNewCampaignModal(true)}
                    className="b or"
                    style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "12px" }}
                  >
                    <Plus size={15} />
                    <span>New Campaign Brief</span>
                  </button>
                )}
              </div>

              {/* Brand Tab 1: Discover */}
              {brandTab === "find" && (
                <div>
                  {/* Search and Filters */}
                  <div
                    style={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--ln)",
                      borderRadius: "18px",
                      padding: "18px",
                      marginBottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "14px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          minWidth: "240px",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Search
                          size={16}
                          color="var(--mu)"
                          style={{ position: "absolute", left: "14px" }}
                        />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search creators by name, handle, city, or niche..."
                          style={{
                            width: "100%",
                            padding: "11px 14px 11px 40px",
                            borderRadius: "12px",
                            border: "1px solid var(--ln)",
                            backgroundColor: "var(--alt)",
                            color: "var(--ink)",
                            fontSize: "14px",
                            outline: "none",
                          }}
                        />
                      </div>

                      <select
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                        style={{
                          padding: "11px 16px",
                          borderRadius: "12px",
                          border: "1px solid var(--ln)",
                          backgroundColor: "var(--alt)",
                          color: "var(--ink)",
                          fontSize: "13px",
                          outline: "none",
                          fontWeight: 500,
                        }}
                      >
                        <option value="All">All Platforms</option>
                        <option value="Instagram">Instagram</option>
                        <option value="YouTube">YouTube</option>
                      </select>

                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                          padding: "11px 16px",
                          borderRadius: "12px",
                          border: "1px solid var(--ln)",
                          backgroundColor: "var(--alt)",
                          color: "var(--ink)",
                          fontSize: "13px",
                          outline: "none",
                          fontWeight: 500,
                        }}
                      >
                        <option value="default">Sort by Relevance</option>
                        <option value="followers">Highest Followers</option>
                        <option value="engagement">Highest Engagement</option>
                        <option value="rate-low">Lowest Rate/Post</option>
                        <option value="rate-high">Highest Rate/Post</option>
                      </select>
                    </div>

                    {/* Niche Pills */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--mu)",
                          textTransform: "uppercase",
                          marginRight: "4px",
                        }}
                      >
                        Niches:
                      </span>
                      <button
                        onClick={() => setSelectedNiche("All")}
                        style={{
                          padding: "5px 14px",
                          borderRadius: "99px",
                          fontSize: "13px",
                          fontWeight: 600,
                          backgroundColor: selectedNiche === "All" ? "var(--btn)" : "var(--alt)",
                          color: selectedNiche === "All" ? "var(--btnt)" : "var(--mu)",
                          border: "1px solid var(--ln)",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        ⚡ All
                      </button>
                      {NICHES.map((n) => (
                        <button
                          key={n}
                          onClick={() => setSelectedNiche(n)}
                          style={{
                            padding: "5px 14px",
                            borderRadius: "99px",
                            fontSize: "13px",
                            fontWeight: selectedNiche === n ? 600 : 500,
                            backgroundColor: selectedNiche === n ? "var(--btn)" : "var(--alt)",
                            color: selectedNiche === n ? "var(--btnt)" : "var(--mu)",
                            border: "1px solid var(--ln)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <span>{NICHE_EMOJIS[n] || "🏷️"}</span>
                          <span>{n}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Creators Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                      gap: "20px",
                    }}
                  >
                    {filteredCreators.map((creator) => (
                      <CreatorCard
                        key={creator.id}
                        creator={creator}
                        onInvite={(c) => setInviteModalCreator(c)}
                      />
                    ))}
                  </div>

                  {filteredCreators.length === 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "60px 20px",
                        backgroundColor: "var(--card)",
                        borderRadius: "20px",
                        border: "1px dashed var(--ln)",
                      }}
                    >
                      <p style={{ color: "var(--mu)", fontSize: "15px" }}>
                        No creators match your current filter criteria.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedNiche("All");
                          setSelectedPlatform("All");
                          setSearchQuery("");
                        }}
                        style={{
                          marginTop: "12px",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--or)",
                        }}
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Brand Tab 2: My Campaigns */}
              {brandTab === "campaigns" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {brandOwnedOffers.map((offer) => {
                    const campaignApps = applications.filter((a) => a.offerId === offer.id);

                    return (
                      <div
                        key={offer.id}
                        style={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--ln)",
                          borderRadius: "20px",
                          padding: "24px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            marginBottom: "8px",
                            flexWrap: "wrap",
                            gap: "12px",
                          }}
                        >
                          <div>
                            <h3
                              style={{
                                fontSize: "20px",
                                fontWeight: 700,
                                fontFamily: "var(--font-heading)",
                                color: "var(--ink)",
                              }}
                            >
                              {offer.title}
                            </h3>
                            <p style={{ fontSize: "14px", color: "var(--mu)", marginTop: "2px" }}>
                              {offer.niche} · {offer.deliverables} · {offer.days || 14} days remaining
                            </p>
                          </div>

                          <div style={{ textAlign: "right" }}>
                            <div
                              style={{
                                fontSize: "16px",
                                fontWeight: 700,
                                fontFamily: "var(--font-mono)",
                                color: "var(--ink)",
                              }}
                            >
                              {formatMoney(offer.budgetMin)} – {formatMoney(offer.budgetMax)}
                            </div>
                            <div style={{ fontSize: "11px", color: "var(--mu)", textTransform: "uppercase" }}>
                              Budget Allocation
                            </div>
                          </div>
                        </div>

                        {/* Applicants Drawer */}
                        <div
                          style={{
                            marginTop: "20px",
                            paddingTop: "16px",
                            borderTop: "1px solid var(--ln)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: "12px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "var(--mu)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              Applicant Roster ({campaignApps.length})
                            </span>
                          </div>

                          {campaignApps.length === 0 ? (
                            <p style={{ fontSize: "13px", color: "var(--mu)", fontStyle: "italic" }}>
                              No applicants yet. Creators can apply from the public marketplace.
                            </p>
                          ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                              {campaignApps.map((app) => {
                                const creator = creators.find((c) => c.id === app.influencerId);
                                const creatorName = creator?.name || "Applicant";

                                return (
                                  <div
                                    key={app.id}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      padding: "12px 16px",
                                      borderRadius: "14px",
                                      backgroundColor: "var(--alt)",
                                      border: "1px solid var(--ln)",
                                      gap: "14px",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: "220px" }}>
                                      <Avatar name={creatorName} size={36} />
                                      <div>
                                        <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>
                                          {creatorName}
                                        </div>
                                        <div style={{ fontSize: "12px", color: "var(--mu)", fontFamily: "var(--font-mono)" }}>
                                          {creator?.handle || "@creator"} · {formatMoney(app.rate)}
                                        </div>
                                      </div>
                                    </div>

                                    {app.pitch && (
                                      <div
                                        style={{
                                          flex: 1,
                                          minWidth: "200px",
                                          fontSize: "13px",
                                          color: "var(--ink)",
                                          fontStyle: "italic",
                                        }}
                                      >
                                        &ldquo;{app.pitch}&rdquo;
                                      </div>
                                    )}

                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                      <StatusBadge status={app.status} />

                                      {(app.status === "Applied" || app.status === "Invited") && (
                                        <div style={{ display: "flex", gap: "6px" }}>
                                          <button
                                            onClick={() => handleUpdateApplicationStatus(app.id, "Shortlisted")}
                                            style={{
                                              padding: "6px 12px",
                                              borderRadius: "8px",
                                              backgroundColor: "rgba(234, 179, 8, 0.15)",
                                              color: "#b45309",
                                              fontSize: "12px",
                                              fontWeight: 600,
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "4px",
                                            }}
                                            title="Shortlist applicant"
                                          >
                                            <Star size={13} />
                                            <span>Shortlist</span>
                                          </button>
                                          <button
                                            onClick={() => handleUpdateApplicationStatus(app.id, "Rejected")}
                                            style={{
                                              padding: "6px 9px",
                                              borderRadius: "8px",
                                              backgroundColor: "rgba(239, 68, 68, 0.12)",
                                              color: "#dc2626",
                                              fontSize: "12px",
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                            title="Decline applicant"
                                          >
                                            <XCircle size={14} />
                                          </button>
                                        </div>
                                      )}

                                      {app.status === "Shortlisted" && (
                                        <button
                                          onClick={() => handleUpdateApplicationStatus(app.id, "Hired")}
                                          className="b"
                                          style={{
                                            padding: "6px 16px",
                                            borderRadius: "8px",
                                            backgroundColor: "var(--ok)",
                                            color: "#FFFFFF",
                                            border: "none",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                          }}
                                        >
                                          <CheckCircle2 size={13} />
                                          <span>Hire Creator</span>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================= CREATOR VIEW ================= */}
          {role === "creator" && (
            <div>
              {/* Creator Sub Tabs */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                <button
                  onClick={() => setCreatorTab("browse")}
                  className={`b ${creatorTab === "browse" ? "d" : ""}`}
                  style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "99px" }}
                >
                  Browse Deals ({filteredMarketOffers.length})
                </button>
                <button
                  onClick={() => setCreatorTab("applications")}
                  className={`b ${creatorTab === "applications" ? "d" : ""}`}
                  style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "99px" }}
                >
                  My Applications ({creatorApplications.length})
                </button>
                <button
                  onClick={() => setCreatorTab("profile")}
                  className={`b ${creatorTab === "profile" ? "d" : ""}`}
                  style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "99px" }}
                >
                  Verified Channel Profile
                </button>
              </div>

              {/* Creator Tab 1: Browse Deals */}
              {creatorTab === "browse" && (
                <div>
                  {/* Search and Niche filter */}
                  <div
                    style={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--ln)",
                      borderRadius: "18px",
                      padding: "18px",
                      marginBottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "14px",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Search
                          size={16}
                          color="var(--mu)"
                          style={{ position: "absolute", left: "14px" }}
                        />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search open briefs by brand or campaign title..."
                          style={{
                            width: "100%",
                            padding: "11px 14px 11px 40px",
                            borderRadius: "12px",
                            border: "1px solid var(--ln)",
                            backgroundColor: "var(--alt)",
                            color: "var(--ink)",
                            fontSize: "14px",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--mu)",
                          textTransform: "uppercase",
                          marginRight: "4px",
                        }}
                      >
                        Niches:
                      </span>
                      <button
                        onClick={() => setSelectedNiche("All")}
                        style={{
                          padding: "5px 14px",
                          borderRadius: "99px",
                          fontSize: "13px",
                          fontWeight: 600,
                          backgroundColor: selectedNiche === "All" ? "var(--btn)" : "var(--alt)",
                          color: selectedNiche === "All" ? "var(--btnt)" : "var(--mu)",
                          border: "1px solid var(--ln)",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        ⚡ All
                      </button>
                      {NICHES.map((n) => (
                        <button
                          key={n}
                          onClick={() => setSelectedNiche(n)}
                          style={{
                            padding: "5px 14px",
                            borderRadius: "99px",
                            fontSize: "13px",
                            fontWeight: selectedNiche === n ? 600 : 500,
                            backgroundColor: selectedNiche === n ? "var(--btn)" : "var(--alt)",
                            color: selectedNiche === n ? "var(--btnt)" : "var(--mu)",
                            border: "1px solid var(--ln)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <span>{NICHE_EMOJIS[n] || "🏷️"}</span>
                          <span>{n}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deals List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {filteredMarketOffers.map((offer) => {
                      const myApp = applications.find(
                        (a) => a.offerId === offer.id && a.influencerId === CURRENT_CREATOR_ID
                      );

                      return (
                        <DealCard
                          key={offer.id}
                          offer={offer}
                          appliedStatus={myApp?.status}
                          onApply={() => setApplyModalOffer(offer)}
                        />
                      );
                    })}
                  </div>

                  {filteredMarketOffers.length === 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "60px 20px",
                        backgroundColor: "var(--card)",
                        borderRadius: "20px",
                        border: "1px dashed var(--ln)",
                      }}
                    >
                      <p style={{ color: "var(--mu)", fontSize: "15px" }}>
                        No campaigns found matching this filter.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Creator Tab 2: My Applications */}
              {creatorTab === "applications" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {creatorApplications.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "60px 20px",
                        backgroundColor: "var(--card)",
                        borderRadius: "20px",
                        border: "1px dashed var(--ln)",
                      }}
                    >
                      <p style={{ color: "var(--mu)", fontSize: "15px" }}>
                        You have not applied to any campaigns yet.
                      </p>
                      <button
                        onClick={() => setCreatorTab("browse")}
                        style={{
                          marginTop: "12px",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--or)",
                        }}
                      >
                        Explore open brand briefs
                      </button>
                    </div>
                  ) : (
                    creatorApplications.map((app) => {
                      const offer = offers.find((o) => o.id === app.offerId);
                      if (!offer) return null;

                      return (
                        <div
                          key={app.id}
                          style={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--ln)",
                            borderRadius: "18px",
                            padding: "20px 24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "16px",
                            flexWrap: "wrap",
                          }}
                        >
                          <div style={{ flex: 1, minWidth: "220px" }}>
                            <span
                              style={{
                                fontSize: "11px",
                                fontFamily: "var(--font-mono)",
                                color: "var(--mu)",
                                textTransform: "uppercase",
                                fontWeight: 600,
                              }}
                            >
                              {offer.brand || "Brand Partner"}
                            </span>
                            <h4
                              style={{
                                fontSize: "18px",
                                fontWeight: 700,
                                fontFamily: "var(--font-heading)",
                                color: "var(--ink)",
                                marginTop: "2px",
                              }}
                            >
                              {offer.title}
                            </h4>
                            <div
                              style={{
                                fontSize: "13px",
                                color: "var(--mu)",
                                marginTop: "4px",
                              }}
                            >
                              {offer.deliverables} · Proposed Rate: {formatMoney(app.rate)}
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <StatusBadge status={app.status} />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Creator Tab 3: Profile */}
              {creatorTab === "profile" && (
                <div
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--ln)",
                    borderRadius: "24px",
                    padding: "32px",
                    maxWidth: "700px",
                    margin: "0 auto",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
                    <Avatar name="Aanya Kapoor" size={72} />
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <h3
                          style={{
                            fontSize: "24px",
                            fontWeight: 700,
                            fontFamily: "var(--font-heading)",
                            color: "var(--ink)",
                          }}
                        >
                          Aanya Kapoor
                        </h3>
                        <ShieldCheck size={20} color="var(--ok)" />
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--mu)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
                        @aanya.styles · Fashion & Aesthetics · Delhi, India
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "12px",
                      marginBottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "var(--alt)",
                        padding: "16px",
                        borderRadius: "16px",
                        textAlign: "center",
                        border: "1px solid var(--ln)",
                      }}
                    >
                      <div style={{ fontSize: "11px", color: "var(--mu)", fontWeight: 600, textTransform: "uppercase" }}>
                        Verified Reach
                      </div>
                      <div
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                          fontFamily: "var(--font-mono)",
                          color: "var(--ink)",
                          marginTop: "4px",
                        }}
                      >
                        245K
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: "var(--alt)",
                        padding: "16px",
                        borderRadius: "16px",
                        textAlign: "center",
                        border: "1px solid var(--ln)",
                      }}
                    >
                      <div style={{ fontSize: "11px", color: "var(--mu)", fontWeight: 600, textTransform: "uppercase" }}>
                        Engagement Rate
                      </div>
                      <div
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                          fontFamily: "var(--font-mono)",
                          color: "var(--ok)",
                          marginTop: "4px",
                        }}
                      >
                        4.8%
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: "var(--alt)",
                        padding: "16px",
                        borderRadius: "16px",
                        textAlign: "center",
                        border: "1px solid var(--ln)",
                      }}
                    >
                      <div style={{ fontSize: "11px", color: "var(--mu)", fontWeight: 600, textTransform: "uppercase" }}>
                        Standard Rate
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          fontFamily: "var(--font-mono)",
                          color: "var(--ink)",
                          marginTop: "4px",
                        }}
                      >
                        ₹25,000
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div style={{ marginBottom: "26px" }}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--mu)",
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      Creator Narrative
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.6 }}>
                      Everyday fashion, thrifted finds, and outfit breakdowns for the modern aesthetic enthusiast.
                      Regularly partner with ethical fashion labels, lifestyle accessories, and sustainable beauty brands.
                    </p>
                  </div>

                  {/* Connected Channels */}
                  <div
                    style={{
                      backgroundColor: "var(--alt)",
                      padding: "18px 20px",
                      borderRadius: "16px",
                      border: "1px solid var(--ln)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--mu)",
                        textTransform: "uppercase",
                        marginBottom: "14px",
                      }}
                    >
                      Connected Social Accounts
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <Instagram size={18} color="#db2777" />
                          <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>
                            @aanya.styles
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "var(--ok)",
                            backgroundColor: "var(--ok-bg)",
                            padding: "2px 9px",
                            borderRadius: "6px",
                          }}
                        >
                          ✓ Verified via OAuth
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <Youtube size={18} color="#dc2626" />
                          <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>
                            Aanya Kapoor Vlogs
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "var(--or)",
                            backgroundColor: "var(--orb)",
                            padding: "2px 9px",
                            borderRadius: "6px",
                          }}
                        >
                          Sync via YouTube Data API
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CONTINUOUS TESTIMONIAL MARQUEE */}
      <TestimonialMarquee />

      {/* INTEGRATIONS SECTION */}
      <section className="wb-int" id="integrations">
        <div className="w">
          <div className="wb-h" style={{ marginInline: "auto" }}>
            <h2>Connect with the tools you already use</h2>
            <p>Sign in with Google, sync YouTube subscriber stats, and plug in payments as they ship.</p>
          </div>

          <div className="wb-orb">
            <span>🔐 Google OAuth</span>
            <span>▶️ YouTube Data API</span>
            <span>📷 Instagram Graph</span>
            <span>💳 Razorpay Escrow</span>
            <span>💠 Stripe Invoicing</span>
            <span>💬 Slack Webhooks</span>
            <span>✉️ Gmail Notifications</span>
            <span>📱 WhatsApp Updates</span>
          </div>
        </div>
      </section>

      {/* INFINITE MOVING RIBBON */}
      <div className="wb-band" aria-hidden="true">
        <div>
          <span>Brands + Creators, working as one</span>
          <span>Never chase a DM again</span>
          <span>Brands + Creators, working as one</span>
          <span>Never chase a DM again</span>
        </div>
      </div>

      {/* BOTTOM GRADIENT CTA BANNER */}
      <section style={{ padding: "30px 0 90px" }}>
        <div className="wb-end">
          <h2>Go to market with creators who actually deliver</h2>
          <p>One unified workspace for campaign briefs, pitch submissions, verified hiring, and transparent payouts.</p>
          <div className="wb-cta">
            <a className="b d" href="#app-workspace">
              Start building for free
            </a>
            <a className="b" href="#app-workspace" style={{ background: "rgba(255, 255, 255, 0.15)", color: "#fff", borderColor: "rgba(255, 255, 255, 0.3)" }}>
              Contact our team
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wb-footer">
        <div className="w">
          <div className="wb-fg">
            <div>
              <a className="wb-logo" href="#">
                <i></i>
                <span>Roster</span>
              </a>
              <p style={{ color: "var(--mu)", fontSize: "14px", maxWidth: "22em", marginTop: "12px", lineHeight: 1.5 }}>
                Direct creator marketplace and deal operating system for forward-thinking brands and creators.
              </p>
            </div>

            <div>
              <h4>Product</h4>
              <a href="#app-workspace">Creator Discovery</a>
              <a href="#app-workspace">Campaign Briefs</a>
              <a href="#app-workspace">Applicant Pipeline</a>
              <a href="#app-workspace">Verified Analytics</a>
            </div>

            <div>
              <h4>Solutions</h4>
              <a href="#app-workspace">D2C Brands</a>
              <a href="#app-workspace">Agencies</a>
              <a href="#app-workspace">Solo Creators</a>
              <a href="#app-workspace">Enterprise</a>
            </div>

            <div>
              <h4>Resources</h4>
              <a href="https://github.com/dhruvsaini-code/roster" target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
              <a href="#how-it-works">How It Works</a>
              <a href="#integrations">Integrations</a>
              <a href="#">Help Center</a>
            </div>

            <div>
              <h4>Comparison</h4>
              <a href="#next">Roster vs Sheets</a>
              <a href="#next">Roster vs Instagram DMs</a>
              <a href="#next">Roster vs WhatsApp</a>
              <a href="#next">Roster vs Agencies</a>
            </div>
          </div>

          <div className="wb-cp">
            <span>© 2026 Roster. Inspired by WorksBuddy. Built by Dhruv Saini.</span>
            <span>Privacy Policy · Terms of Service · Security</span>
          </div>
        </div>
      </footer>

      {/* Floating Scroll Down button */}
      <a className="wb-dn" href="#next" aria-label="Scroll down">
        ⌄
      </a>

      {/* ============================================================== */}
      {/* MODALS                                                         */}
      {/* ============================================================== */}

      {/* 1. Creator Application Modal */}
      {applyModalOffer && (
        <Modal
          title={`Pitch for ${applyModalOffer.title}`}
          subtitle={`${applyModalOffer.brand || "Brand"} · ${applyModalOffer.deliverables} · Budget ${formatMoney(applyModalOffer.budgetMin)}–${formatMoney(applyModalOffer.budgetMax)}`}
          onClose={() => setApplyModalOffer(null)}
        >
          <form onSubmit={handleApplySubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--mu)",
                  marginBottom: "6px",
                }}
              >
                Why are you a great fit for this brief?
              </label>
              <textarea
                value={pitchText}
                onChange={(e) => setPitchText(e.target.value)}
                placeholder="Mention past similar campaigns, your audience demographics, or creative content concept..."
                rows={4}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid var(--ln)",
                  backgroundColor: "var(--alt)",
                  color: "var(--ink)",
                  fontSize: "13px",
                  outline: "none",
                  resize: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--mu)",
                  marginBottom: "6px",
                }}
              >
                Your Proposed Commercial Rate (₹ INR)
              </label>
              <input
                type="number"
                value={proposedRate}
                onChange={(e) => setProposedRate(e.target.value)}
                placeholder="30000"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid var(--ln)",
                  backgroundColor: "var(--alt)",
                  color: "var(--ink)",
                  fontSize: "14px",
                  fontFamily: "var(--font-mono)",
                  outline: "none",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!pitchText.trim() || !proposedRate.trim()}
              className="b or"
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                opacity: !pitchText.trim() || !proposedRate.trim() ? 0.5 : 1,
              }}
            >
              <Send size={15} />
              <span>Submit Deal Pitch</span>
            </button>
          </form>
        </Modal>
      )}

      {/* 2. Brand Invite Creator Modal */}
      {inviteModalCreator && (
        <Modal
          title={`Invite ${inviteModalCreator.name}`}
          subtitle={`${inviteModalCreator.handle} · ${inviteModalCreator.niche} · Rate: ${formatMoney(inviteModalCreator.rate)}`}
          onClose={() => setInviteModalCreator(null)}
        >
          <form onSubmit={handleInviteSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--mu)",
                  marginBottom: "6px",
                }}
              >
                Select Target Campaign
              </label>
              <select
                value={inviteCampaignId}
                onChange={(e) => setInviteCampaignId(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid var(--ln)",
                  backgroundColor: "var(--alt)",
                  color: "var(--ink)",
                  fontSize: "13px",
                  outline: "none",
                }}
              >
                <option value="">-- Choose one of your active campaigns --</option>
                {brandOwnedOffers.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.title} ({formatMoney(o.budgetMin)}–{formatMoney(o.budgetMax)})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={!inviteCampaignId}
              className="b d"
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                opacity: !inviteCampaignId ? 0.5 : 1,
              }}
            >
              <Send size={15} />
              <span>Send Campaign Invitation</span>
            </button>
          </form>
        </Modal>
      )}

      {/* 3. New Campaign Modal */}
      {newCampaignModal && (
        <Modal
          title="Create New Campaign Brief"
          subtitle="Publish a transparent deal opportunity to vetted creators"
          onClose={() => setNewCampaignModal(false)}
        >
          <form onSubmit={handleCreateCampaign}>
            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--mu)",
                  marginBottom: "6px",
                }}
              >
                Campaign Title
              </label>
              <input
                type="text"
                value={ncTitle}
                onChange={(e) => setNcTitle(e.target.value)}
                placeholder="e.g. Festive Diwali Capsule Launch"
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1px solid var(--ln)",
                  backgroundColor: "var(--alt)",
                  color: "var(--ink)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--mu)",
                  marginBottom: "6px",
                }}
              >
                Primary Niche
              </label>
              <select
                value={ncNiche}
                onChange={(e) => setNcNiche(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1px solid var(--ln)",
                  backgroundColor: "var(--alt)",
                  color: "var(--ink)",
                  fontSize: "13px",
                  outline: "none",
                }}
              >
                {NICHES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "14px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--mu)",
                    marginBottom: "6px",
                  }}
                >
                  Min Budget (₹)
                </label>
                <input
                  type="number"
                  value={ncMin}
                  onChange={(e) => setNcMin(e.target.value)}
                  placeholder="25000"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid var(--ln)",
                    backgroundColor: "var(--alt)",
                    color: "var(--ink)",
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--mu)",
                    marginBottom: "6px",
                  }}
                >
                  Max Budget (₹)
                </label>
                <input
                  type="number"
                  value={ncMax}
                  onChange={(e) => setNcMax(e.target.value)}
                  placeholder="45000"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid var(--ln)",
                    backgroundColor: "var(--alt)",
                    color: "var(--ink)",
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--mu)",
                  marginBottom: "6px",
                }}
              >
                Deliverables Scope
              </label>
              <input
                type="text"
                value={ncDeliverables}
                onChange={(e) => setNcDeliverables(e.target.value)}
                placeholder="e.g. 1 Instagram Reel + 2 Story frames with swipe-up"
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1px solid var(--ln)",
                  backgroundColor: "var(--alt)",
                  color: "var(--ink)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!ncTitle.trim() || !ncMin || !ncMax || !ncDeliverables.trim()}
              className="b or"
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                opacity: !ncTitle.trim() || !ncMin || !ncMax || !ncDeliverables.trim() ? 0.5 : 1,
              }}
            >
              <Plus size={16} />
              <span>Publish Campaign Live</span>
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
