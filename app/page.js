"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Sparkles,
  Briefcase,
  Users2,
  Search,
  SlidersHorizontal,
  Plus,
  Send,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Filter,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Instagram, Youtube } from "@/components/Icons";
import Avatar from "@/components/Avatar";
import StatusBadge from "@/components/StatusBadge";
import DealCard, { formatMoney } from "@/components/DealCard";
import CreatorCard, { formatFollowers } from "@/components/CreatorCard";
import MetricsOverview from "@/components/MetricsOverview";
import Modal from "@/components/Modal";
import Toast from "@/components/Toast";
import { NICHES, CREATORS, INITIAL_OFFERS, INITIAL_APPLICATIONS } from "@/lib/seedData";

const CURRENT_CREATOR_ID = "inf-1"; // Aanya Kapoor

export default function Home() {
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
    showToast(`Applicant status marked as "${newStatus}"! ✨`);
  };

  // Total deal volume estimate
  const totalDealValue = useMemo(() => {
    return offers.reduce((acc, curr) => acc + (curr.budgetMin + curr.budgetMax) / 2, 0);
  }, [offers]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--paper)" }}>
      {/* Toast Notification Container */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Global Navigation Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backgroundColor: "rgba(245, 243, 236, 0.94)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--line)",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Brand Logo & Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              backgroundColor: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(18, 20, 29, 0.15)",
            }}
          >
            <Sparkles size={18} color="var(--gold)" />
          </div>
          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                fontFamily: "var(--font-heading)",
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                lineHeight: 1,
              }}
            >
              Roster
            </div>
            <div
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
                color: "var(--slate)",
                marginTop: "2px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Creator Marketplace
            </div>
          </div>
        </div>

        {/* Persona Mode Switcher */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "4px",
            backgroundColor: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: "9999px",
            boxShadow: "0 2px 8px rgba(18, 20, 29, 0.04)",
          }}
        >
          <button
            onClick={() => setRole("brand")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 16px",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: 600,
              backgroundColor: role === "brand" ? "var(--ink)" : "transparent",
              color: role === "brand" ? "var(--paper)" : "var(--ink-soft)",
            }}
          >
            <Briefcase size={14} />
            <span>Brand Portal</span>
          </button>

          <button
            onClick={() => setRole("creator")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 16px",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: 600,
              backgroundColor: role === "creator" ? "var(--ink)" : "transparent",
              color: role === "creator" ? "var(--paper)" : "var(--ink-soft)",
            }}
          >
            <Users2 size={14} />
            <span>Creator Hub</span>
          </button>
        </div>

        {/* User Identity Pill */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {role === "brand" ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>
                  Glowly Skincare
                </div>
                <div style={{ fontSize: "11px", color: "var(--slate)", fontFamily: "var(--font-mono)" }}>
                  Verified Brand
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
                <div style={{ fontSize: "11px", color: "var(--slate)", fontFamily: "var(--font-mono)" }}>
                  @aanya.styles
                </div>
              </div>
              <Avatar name="Aanya Kapoor" size={36} />
            </div>
          )}
        </div>
      </header>

      {/* Main App Container */}
      <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* KPI Summary Cards */}
        <MetricsOverview
          offersCount={offers.length}
          creatorsCount={creators.length}
          totalValue={totalDealValue}
          avgEngagement="5.8"
        />

        {/* ============================================================== */}
        {/* BRAND VIEW                                                     */}
        {/* ============================================================== */}
        {role === "brand" && (
          <div>
            {/* View Sub-Tabs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setBrandTab("find")}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "9999px",
                    fontSize: "13px",
                    fontWeight: 600,
                    backgroundColor: brandTab === "find" ? "var(--ink)" : "var(--card)",
                    color: brandTab === "find" ? "var(--paper)" : "var(--ink-soft)",
                    border: "1px solid var(--line)",
                  }}
                >
                  Discover Creators ({filteredCreators.length})
                </button>
                <button
                  onClick={() => setBrandTab("campaigns")}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "9999px",
                    fontSize: "13px",
                    fontWeight: 600,
                    backgroundColor: brandTab === "campaigns" ? "var(--ink)" : "var(--card)",
                    color: brandTab === "campaigns" ? "var(--paper)" : "var(--ink-soft)",
                    border: "1px solid var(--line)",
                  }}
                >
                  My Campaigns ({brandOwnedOffers.length})
                </button>
              </div>

              {brandTab === "campaigns" && (
                <button
                  onClick={() => setNewCampaignModal(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "9px 18px",
                    borderRadius: "12px",
                    backgroundColor: "var(--cobalt)",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(43, 69, 246, 0.2)",
                  }}
                >
                  <Plus size={16} />
                  <span>New Campaign Brief</span>
                </button>
              )}
            </div>

            {/* TAB 1: Discover Creators */}
            {brandTab === "find" && (
              <div>
                {/* Search & Filter Bar */}
                <div
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--line)",
                    borderRadius: "16px",
                    padding: "16px",
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
                    {/* Live Search */}
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
                        color="var(--slate)"
                        style={{ position: "absolute", left: "12px" }}
                      />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, handle, city, or niche..."
                        style={{
                          width: "100%",
                          padding: "10px 14px 10px 38px",
                          borderRadius: "10px",
                          border: "1px solid var(--line)",
                          backgroundColor: "var(--paper)",
                          color: "var(--ink)",
                          fontSize: "13px",
                          outline: "none",
                        }}
                      />
                    </div>

                    {/* Platform Selector */}
                    <select
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid var(--line)",
                        backgroundColor: "var(--paper)",
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

                    {/* Sort Dropdown */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid var(--line)",
                        backgroundColor: "var(--paper)",
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
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--slate)",
                        textTransform: "uppercase",
                        marginRight: "4px",
                      }}
                    >
                      Niches:
                    </span>
                    <button
                      onClick={() => setSelectedNiche("All")}
                      style={{
                        padding: "5px 12px",
                        borderRadius: "9999px",
                        fontSize: "12px",
                        fontWeight: 600,
                        backgroundColor: selectedNiche === "All" ? "var(--ink)" : "var(--paper)",
                        color: selectedNiche === "All" ? "var(--paper)" : "var(--ink-soft)",
                        border: "1px solid var(--line)",
                      }}
                    >
                      All
                    </button>
                    {NICHES.map((n) => (
                      <button
                        key={n}
                        onClick={() => setSelectedNiche(n)}
                        style={{
                          padding: "5px 12px",
                          borderRadius: "9999px",
                          fontSize: "12px",
                          fontWeight: 500,
                          backgroundColor: selectedNiche === n ? "var(--ink)" : "var(--paper)",
                          color: selectedNiche === n ? "var(--paper)" : "var(--ink-soft)",
                          border: "1px solid var(--line)",
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Creators Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
                    gap: "18px",
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
                      borderRadius: "18px",
                      border: "1px dashed var(--line)",
                    }}
                  >
                    <p style={{ color: "var(--slate)", fontSize: "14px" }}>
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
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--cobalt)",
                      }}
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: My Campaigns */}
            {brandTab === "campaigns" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {brandOwnedOffers.map((offer) => {
                  const campaignApps = applications.filter((a) => a.offerId === offer.id);

                  return (
                    <div
                      key={offer.id}
                      style={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--line)",
                        borderRadius: "18px",
                        padding: "24px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              fontSize: "18px",
                              fontWeight: 700,
                              fontFamily: "var(--font-heading)",
                              color: "var(--ink)",
                            }}
                          >
                            {offer.title}
                          </h3>
                          <p style={{ fontSize: "13px", color: "var(--slate)", marginTop: "2px" }}>
                            {offer.niche} · {offer.deliverables} · {offer.days || 14} days remaining
                          </p>
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontSize: "15px",
                              fontWeight: 700,
                              fontFamily: "var(--font-mono)",
                              color: "var(--ink)",
                            }}
                          >
                            {formatMoney(offer.budgetMin)} – {formatMoney(offer.budgetMax)}
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--slate)", textTransform: "uppercase" }}>
                            Target Budget
                          </div>
                        </div>
                      </div>

                      {/* Applicants Roster Drawer */}
                      <div
                        style={{
                          marginTop: "20px",
                          paddingTop: "16px",
                          borderTop: "1px solid var(--line)",
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
                              color: "var(--slate)",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Applicant Roster ({campaignApps.length})
                          </span>
                        </div>

                        {campaignApps.length === 0 ? (
                          <p style={{ fontSize: "13px", color: "var(--slate)", fontStyle: "italic" }}>
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
                                    padding: "12px 14px",
                                    borderRadius: "12px",
                                    backgroundColor: "var(--paper)",
                                    border: "1px solid var(--line)",
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
                                      <div style={{ fontSize: "12px", color: "var(--slate)", fontFamily: "var(--font-mono)" }}>
                                        {creator?.handle || "@creator"} · {formatMoney(app.rate)}
                                      </div>
                                    </div>
                                  </div>

                                  {app.pitch && (
                                    <div
                                      style={{
                                        flex: 1,
                                        minWidth: "200px",
                                        fontSize: "12px",
                                        color: "var(--ink-soft)",
                                        fontStyle: "italic",
                                      }}
                                    >
                                      &ldquo;{app.pitch}&rdquo;
                                    </div>
                                  )}

                                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <StatusBadge status={app.status} />

                                    {/* Action buttons depending on current status */}
                                    {(app.status === "Applied" || app.status === "Invited") && (
                                      <div style={{ display: "flex", gap: "6px" }}>
                                        <button
                                          onClick={() => handleUpdateApplicationStatus(app.id, "Shortlisted")}
                                          style={{
                                            padding: "6px 10px",
                                            borderRadius: "8px",
                                            backgroundColor: "var(--gold-soft)",
                                            color: "var(--gold)",
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
                                            padding: "6px 8px",
                                            borderRadius: "8px",
                                            backgroundColor: "var(--red-soft)",
                                            color: "var(--red)",
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
                                        style={{
                                          padding: "6px 14px",
                                          borderRadius: "8px",
                                          backgroundColor: "var(--green)",
                                          color: "#FFFFFF",
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

        {/* ============================================================== */}
        {/* CREATOR VIEW                                                   */}
        {/* ============================================================== */}
        {role === "creator" && (
          <div>
            {/* View Sub-Tabs */}
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
                style={{
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  backgroundColor: creatorTab === "browse" ? "var(--ink)" : "var(--card)",
                  color: creatorTab === "browse" ? "var(--paper)" : "var(--ink-soft)",
                  border: "1px solid var(--line)",
                }}
              >
                Browse Deals ({filteredMarketOffers.length})
              </button>
              <button
                onClick={() => setCreatorTab("applications")}
                style={{
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  backgroundColor: creatorTab === "applications" ? "var(--ink)" : "var(--card)",
                  color: creatorTab === "applications" ? "var(--paper)" : "var(--ink-soft)",
                  border: "1px solid var(--line)",
                }}
              >
                My Applications ({creatorApplications.length})
              </button>
              <button
                onClick={() => setCreatorTab("profile")}
                style={{
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  backgroundColor: creatorTab === "profile" ? "var(--ink)" : "var(--card)",
                  color: creatorTab === "profile" ? "var(--paper)" : "var(--ink-soft)",
                  border: "1px solid var(--line)",
                }}
              >
                Verified Channel Profile
              </button>
            </div>

            {/* TAB 1: Browse Deals */}
            {creatorTab === "browse" && (
              <div>
                {/* Search & Niche Filter Bar */}
                <div
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--line)",
                    borderRadius: "16px",
                    padding: "16px",
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
                        color="var(--slate)"
                        style={{ position: "absolute", left: "12px" }}
                      />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search open briefs by brand or title..."
                        style={{
                          width: "100%",
                          padding: "10px 14px 10px 38px",
                          borderRadius: "10px",
                          border: "1px solid var(--line)",
                          backgroundColor: "var(--paper)",
                          color: "var(--ink)",
                          fontSize: "13px",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Niche Pills */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--slate)",
                        textTransform: "uppercase",
                        marginRight: "4px",
                      }}
                    >
                      Niches:
                    </span>
                    <button
                      onClick={() => setSelectedNiche("All")}
                      style={{
                        padding: "5px 12px",
                        borderRadius: "9999px",
                        fontSize: "12px",
                        fontWeight: 600,
                        backgroundColor: selectedNiche === "All" ? "var(--ink)" : "var(--paper)",
                        color: selectedNiche === "All" ? "var(--paper)" : "var(--ink-soft)",
                        border: "1px solid var(--line)",
                      }}
                    >
                      All
                    </button>
                    {NICHES.map((n) => (
                      <button
                        key={n}
                        onClick={() => setSelectedNiche(n)}
                        style={{
                          padding: "5px 12px",
                          borderRadius: "9999px",
                          fontSize: "12px",
                          fontWeight: 500,
                          backgroundColor: selectedNiche === n ? "var(--ink)" : "var(--paper)",
                          color: selectedNiche === n ? "var(--paper)" : "var(--ink-soft)",
                          border: "1px solid var(--line)",
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ticket Cards List */}
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
                      borderRadius: "18px",
                      border: "1px dashed var(--line)",
                    }}
                  >
                    <p style={{ color: "var(--slate)", fontSize: "14px" }}>
                      No campaigns found matching this filter.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: My Applications */}
            {creatorTab === "applications" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {creatorApplications.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "60px 20px",
                      backgroundColor: "var(--card)",
                      borderRadius: "18px",
                      border: "1px dashed var(--line)",
                    }}
                  >
                    <p style={{ color: "var(--slate)", fontSize: "14px" }}>
                      You have not applied to any campaigns yet.
                    </p>
                    <button
                      onClick={() => setCreatorTab("browse")}
                      style={{
                        marginTop: "12px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--cobalt)",
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
                          border: "1px solid var(--line)",
                          borderRadius: "16px",
                          padding: "18px 22px",
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
                              color: "var(--slate)",
                              textTransform: "uppercase",
                              fontWeight: 600,
                            }}
                          >
                            {offer.brand || "Brand Partner"}
                          </span>
                          <h4
                            style={{
                              fontSize: "16px",
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
                              fontSize: "12px",
                              color: "var(--slate)",
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

            {/* TAB 3: Creator Profile & Channels */}
            {creatorTab === "profile" && (
              <div
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "20px",
                  padding: "28px",
                  maxWidth: "680px",
                  margin: "0 auto",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "22px" }}>
                  <Avatar name="Aanya Kapoor" size={68} />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <h3
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                          fontFamily: "var(--font-heading)",
                          color: "var(--ink)",
                        }}
                      >
                        Aanya Kapoor
                      </h3>
                      <ShieldCheck size={18} color="var(--cobalt)" fill="var(--cobalt-soft)" />
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--slate)", fontFamily: "var(--font-mono)" }}>
                      @aanya.styles · Fashion & Aesthetics · Delhi, India
                    </p>
                  </div>
                </div>

                {/* Verified Metrics Cards */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "12px",
                    marginBottom: "22px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "var(--paper)",
                      padding: "16px",
                      borderRadius: "14px",
                      textAlign: "center",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "var(--slate)", fontWeight: 600, textTransform: "uppercase" }}>
                      Total Reach
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
                      245K
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--paper)",
                      padding: "16px",
                      borderRadius: "14px",
                      textAlign: "center",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "var(--slate)", fontWeight: 600, textTransform: "uppercase" }}>
                      Engagement Rate
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        fontFamily: "var(--font-mono)",
                        color: "var(--green)",
                        marginTop: "4px",
                      }}
                    >
                      4.8%
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--paper)",
                      padding: "16px",
                      borderRadius: "14px",
                      textAlign: "center",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "var(--slate)", fontWeight: 600, textTransform: "uppercase" }}>
                      Standard Rate
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
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

                {/* Bio & Details */}
                <div style={{ marginBottom: "24px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--slate)",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    Creator Narrative
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.6 }}>
                    Everyday fashion, thrifted finds, and outfit breakdowns for the modern aesthetic enthusiast.
                    Regularly partner with ethical fashion labels, lifestyle accessories, and sustainable beauty brands.
                  </p>
                </div>

                {/* Connected Verified Channels */}
                <div
                  style={{
                    backgroundColor: "var(--paper)",
                    padding: "16px 18px",
                    borderRadius: "14px",
                    border: "1px solid var(--line)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--slate)",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Connected Social Accounts
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Instagram size={18} color="#DB2777" />
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>
                          @aanya.styles
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "var(--green)",
                          backgroundColor: "var(--green-soft)",
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        ✓ Verified via OAuth
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Youtube size={18} color="#DC2626" />
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>
                          Aanya Kapoor Vlogs
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "var(--cobalt)",
                          backgroundColor: "var(--cobalt-soft)",
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        Sync via Google API
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

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
                  color: "var(--ink-soft)",
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
                  border: "1px solid var(--line)",
                  backgroundColor: "var(--paper)",
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
                  color: "var(--ink-soft)",
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
                  border: "1px solid var(--line)",
                  backgroundColor: "var(--paper)",
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
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                backgroundColor: "var(--cobalt)",
                color: "#FFFFFF",
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
              <span>Submit Deal Application</span>
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
                  color: "var(--ink-soft)",
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
                  border: "1px solid var(--line)",
                  backgroundColor: "var(--paper)",
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
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                backgroundColor: "var(--ink)",
                color: "var(--paper)",
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
                  color: "var(--ink-soft)",
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
                  border: "1px solid var(--line)",
                  backgroundColor: "var(--paper)",
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
                  color: "var(--ink-soft)",
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
                  border: "1px solid var(--line)",
                  backgroundColor: "var(--paper)",
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
                    color: "var(--ink-soft)",
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
                    border: "1px solid var(--line)",
                    backgroundColor: "var(--paper)",
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
                    color: "var(--ink-soft)",
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
                    border: "1px solid var(--line)",
                    backgroundColor: "var(--paper)",
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
                  color: "var(--ink-soft)",
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
                  border: "1px solid var(--line)",
                  backgroundColor: "var(--paper)",
                  color: "var(--ink)",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!ncTitle.trim() || !ncMin || !ncMax || !ncDeliverables.trim()}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                backgroundColor: "var(--cobalt)",
                color: "#FFFFFF",
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
