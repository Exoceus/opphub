import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import OpportunityItem from "../../opportunity/item.opp";

export default function FeaturedView() {
  const [oppData1, setOppData1] = useState(null);
  const [oppData2, setOppData2] = useState(null);
  const [oppData3, setOppData3] = useState(null);
  const [oppData4, setOppData4] = useState(null);

  useEffect(() => {
    axios
      .get("/api/opp/all/feature", {
        params: {
          type: "sector",
          value: ["Technology"],
          verified: true,
          limit: 5,
        },
      })
      .then((response) => {
        var data = response.data;

        setOppData1(data);
      })

      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/api/opp/all/feature", {
        params: {
          type: "sector",
          value: ["Business"],
          verified: true,
          limit: 5,
        },
      })
      .then((response) => {
        var data = response.data;

        setOppData2(data);
      })

      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/api/opp/all/feature", {
        params: {
          type: "sector",
          value: ["Medical"],
          verified: true,
          limit: 5,
        },
      })
      .then((response) => {
        var data = response.data;

        setOppData3(data);
      })

      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/api/opp/all/feature", {
        params: {
          type: "sector",
          value: ["Law"],
          verified: true,
          limit: 5,
        },
      })
      .then((response) => {
        var data = response.data;

        setOppData4(data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (oppData1) {
    var tech_opps = oppData1.map((opp) => (
      <div style={{ marginBottom: 16 }}>
        <OpportunityItem opp={opp} edit_mode={false} list_layout={"block"} />{" "}
      </div>
    ));
  } else {
    var tech_opps = (
      <div className="search-loader-wrapper">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (oppData2) {
    var biz_opps = oppData2.map((opp) => (
      <div style={{ marginBottom: 16 }}>
        <OpportunityItem opp={opp} edit_mode={false} list_layout={"block"} />{" "}
      </div>
    ));
  } else {
    var biz_opps = (
      <div className="search-loader-wrapper">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (oppData3) {
    var med_opps = oppData3.map((opp) => (
      <div style={{ marginBottom: 16 }}>
        <OpportunityItem opp={opp} edit_mode={false} list_layout={"block"} />{" "}
      </div>
    ));
  } else {
    var med_opps = (
      <div className="search-loader-wrapper">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (oppData4) {
    var law_opps = oppData4.map((opp) => (
      <div style={{ marginBottom: 16 }}>
        <OpportunityItem opp={opp} edit_mode={false} list_layout={"block"} />{" "}
      </div>
    ));
  } else {
    var law_opps = (
      <div className="search-loader-wrapper">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="featured-opp-section">
        <div className="opp-list-section-header">
          <h2 className="featured-opp-section-title">Technology</h2>
          <Link
            to="/opportunities/featured/sector/Technology"
            className="section-more-link"
          >
            View All <i class="fas fa-chevron-right"></i>
          </Link>
        </div>
        <div>{tech_opps}</div>
      </section>

      <section className="featured-opp-section">
        <div className="opp-list-section-header">
          <h2 className="featured-opp-section-title">Business</h2>
          <Link
            to="/opportunities/featured/sector/Business"
            className="section-more-link"
          >
            View All <i class="fas fa-chevron-right"></i>
          </Link>
        </div>
        <div>{biz_opps}</div>
      </section>

      <section className="featured-opp-section">
        <div className="opp-list-section-header">
          <h2 className="featured-opp-section-title">Medical</h2>
          <Link
            to="/opportunities/featured/sector/Medical"
            className="section-more-link"
          >
            View All <i class="fas fa-chevron-right"></i>
          </Link>
        </div>
        <div>{med_opps}</div>
      </section>

      <section className="featured-opp-section">
        <div className="opp-list-section-header">
          <h2 className="featured-opp-section-title">Law</h2>
          <Link
            to="/opportunities/featured/sector/Law"
            className="section-more-link"
          >
            View All <i class="fas fa-chevron-right"></i>
          </Link>
        </div>
        <div>{law_opps}</div>
      </section>
    </>
  );
}
