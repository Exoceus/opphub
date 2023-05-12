import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import "./home.css";

import Navbar from "../navbar.component";
import Sidebar from "./Sidebar";
import Search from "./Search";
import SearchFilters from "./SearchFilters";
import ProfilePreview from "./ProfilePreview";
import OpportunityItem from "../opportunity/item.opp";
import BannerSlider from "./BannerSlider";
import FeaturedView from "./ContentViews/FeaturedView";

import SearchGraphic from "../../images/Search Graphic.svg";
import BookmarkGraphic from "../../images/Bookmark_Icon.png";
import NoSearchGraphic from "../../images/nosearch.svg";

import { AuthContext } from "../../auth";

var qs = require("qs");

export default function DesktopHome({ match, location, history }) {
  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [oppData, setOppData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [filters, updateFilters] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [oppsLoading, setOppsLoading] = useState(false);
  const [oppPageNumber, setOppPageNumber] = useState(0);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [scrollOpps, setScrollOpps] = useState(null);
  const [searchAttempt, setSearchAttempt] = useState(null);

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const contextData = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    axios
      .get("/api/opp/all/new")
      .then((response) => {
        var data = response.data;

        setOppData(data);
      })

      .catch((error) => {
        console.log(error);
      });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (query.tab === "bookmarks") {
      if (
        bookmarks.length === 0 &&
        contextData.platformUser &&
        contextData.platformUser.starred_opps
      ) {
        setOppsLoading(true);

        var fetchStarOpps = (opp_id) => {
          axios.get("/api/opp/" + opp_id).then((response) => {
            var random_array = response.data[0];
            setBookmarks((r) => [...r, random_array]);
          });
        };

        var starred_opps = contextData.platformUser.starred_opps.map(
          async (opp_id) => await fetchStarOpps(opp_id)
        );

        setOppsLoading(false);
      }
    }
  }, [query.tab]);

  const onSearch = () => {
    if (
      filters &&
      (filters.location.length > 0 ||
        filters.sector.length > 0 ||
        filters.type.length > 0 ||
        filters.demographic.length > 0 ||
        filters.location.length > 0 ||
        searchText)
    ) {
      history.push("/opps?tab=search");

      setSearchResults(null);
      setOppsLoading(true);

      axios
        .get("/api/opp/adv-search", {
          params: {
            region: filters.location,
            sector: filters.sector,
            type: filters.type,
            demographic: filters.demographic,
            text: searchText,
          },
        })
        .then((response) => {
          var data = response.data;

          setOppsLoading(false);
          setSearchResults(data);
          setSearchAttempt(true);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleScroll = (e) => {
    var windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    var body = document.body;
    var html = document.documentElement;
    var docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    var windowBottom = windowHeight + window.pageYOffset + 10;

    if (windowBottom >= docHeight) {
      setScrollOpps(docHeight);
    }
  };

  useEffect(() => {
    var html = document.documentElement;
    var body = document.body;
    var docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    if (scrollOpps && query.tab === "latest") {
      setOppPageNumber(oppPageNumber + 1);
    }
  }, [scrollOpps]);

  useEffect(() => {
    if (oppPageNumber > 0) {
      setScrollLoading(true);

      if (oppPageNumber > 0) {
        axios
          .get("/api/opp/all/new", {
            params: {
              page: oppPageNumber,
              limit: 10,
            },
          })
          .then((response) => {
            var data = response.data;

            setScrollLoading(false);
            setOppData(oppData.concat(data));
          })

          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [oppPageNumber]);

  if (!location.search && !location.search.tab) {
    return <Redirect to="/opps?tab=featured" />;
  } else {
    return (
      <div className="home-page-outer-wrapper">
        <Navbar />
        <div className="home-page-inner-wrapper">
          <div className="home-page-column-wrapper left-column-wrapper">
            <div className="home-sidebar-wrapper">
              <Sidebar tab={query.tab} />
              <SearchFilters
                showSearchOptions={showSearchOptions}
                setShowSearchOptions={setShowSearchOptions}
                onSearch={onSearch}
                updateFilters={updateFilters}
              />
            </div>
          </div>

          <Sidebar tab={query.tab} type="mobile" />

          <div className="home-page-column-wrapper">
            <Search
              showSearchOptions={showSearchOptions}
              setShowSearchOptions={setShowSearchOptions}
              onSearch={onSearch}
              searchText={searchText}
              setSearchText={setSearchText}
            />

            <SearchFilters
              showSearchOptions={showSearchOptions}
              setShowSearchOptions={setShowSearchOptions}
              onSearch={onSearch}
              updateFilters={updateFilters}
              device="mobile"
            />

            {oppsLoading ? (
              <div className="search-loader-wrapper">
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : null}
            {oppData && query.tab === "latest"
              ? oppData.map((opp) => (
                  <div style={{ marginBottom: 16 }}>
                    <OpportunityItem
                      opp={opp}
                      edit_mode={false}
                      list_layout={"block"}
                    />{" "}
                  </div>
                ))
              : null}

            {query.tab === "search" && searchResults
              ? searchResults.map((opp) => (
                  <div style={{ marginBottom: 16 }}>
                    <OpportunityItem
                      opp={opp}
                      edit_mode={false}
                      list_layout={"block"}
                    />{" "}
                  </div>
                ))
              : null}

            {query.tab === "search" &&
            searchResults &&
            searchResults.length === 0 &&
            searchAttempt ? (
              <div className="search-landing-container">
                <img src={NoSearchGraphic} />
                <h2>No Opportunities Found</h2>
                <p>
                  Please try to search with fewer filters and/or with a
                  different search term.
                </p>
              </div>
            ) : null}

            {query.tab === "search" && !searchResults && !searchText ? (
              <div className="search-landing-container">
                <img src={SearchGraphic} />
                <h2>Search For An Opportunity</h2>
                <p>
                  Here you can search for opportunities that are relevant to
                  you! Press the{" "}
                  <span className="green-text">
                    <i class="fas fa-filter"></i>
                  </span>{" "}
                  icon in the search bar or the{" "}
                  <span className="search-landing-focus">
                    Filter Search <span className="green-text">▼</span>
                  </span>{" "}
                  dropdown to select which opportunity characteristics match you
                  interests.{" "}
                </p>
              </div>
            ) : null}

            {query.tab === "bookmarks" &&
            contextData &&
            contextData.platformUser
              ? bookmarks.map((opp) => (
                  <div style={{ marginBottom: 16 }}>
                    <OpportunityItem opp={opp} list_layout={"block"} />{" "}
                  </div>
                ))
              : null}

            {query.tab === "bookmarks" &&
            contextData &&
            !contextData.platformUser ? (
              <div className="search-landing-container">
                <img src={BookmarkGraphic} />
                <h2>Create An Account To Save Opportunities</h2>
                <p>
                  With your OppHub account, you can easily bookmark
                  opportunities to save them for future reference!
                </p>
                <Link className="home-promo-button" to={`/login/user`}>
                  <i class="fas fa-sign-in-alt"></i> Sign In
                </Link>
                <Link className="home-promo-button" to={`/login/user`}>
                  <i class="fas fa-user-plus"></i> Create Account
                </Link>
              </div>
            ) : null}

            {query.tab === "featured" ? <FeaturedView /> : null}

            {query.tab === "latest" && scrollLoading ? (
              <div className="align-center scroll-infinite-home">
                <div className="search-loader-wrapper">
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            ) : null}

            {query.tab === "latest" && !scrollLoading ? (
              <div className="align-center scroll-infinite-home">
                <div>Scroll For More</div>
                <div>
                  <i className="fas fa-angle-double-down scroll-infinite-icon"></i>
                </div>
              </div>
            ) : null}

            {query.tab === "account" ? (
              <ProfilePreview
                user={
                  contextData && contextData.platformUser
                    ? contextData.platformUser
                    : null
                }
              />
            ) : null}
          </div>

          <div className="home-page-column-wrapper right-column-wrapper">
            <div className="right-bar-wrapper">
              <ProfilePreview
                user={
                  contextData && contextData.platformUser
                    ? contextData.platformUser
                    : null
                }
              />
              <BannerSlider />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
