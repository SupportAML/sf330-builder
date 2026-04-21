import type { SF330Doc } from "./types";

export const DEMO_DOC_ID = "demo-apexmedlaw-va-ogc";

export const DEMO_DOC: SF330Doc = {
  id: DEMO_DOC_ID,
  name: "VA OGC — Medical-Legal Expert Witness Services (Demo)",
  updatedAt: Date.UTC(2026, 3, 15),
  sectionA: {
    title: "Medical-Legal Expert Witness Services for VA Office of General Counsel",
    contractNumber: "36C24524R0183",
    solicitationNumber: "36C24524R0183-SOL",
    date: "2026-04-15",
  },
  sectionB: {
    name: "Abhi Kapuria, MD",
    title: "Chief Executive Officer",
    firm: "ApexMedLaw, LLC",
    address: "3344 Peachtree Rd NE, Suite 800\nAtlanta, GA 30326",
    phone: "(404) 555-0142",
    fax: "(404) 555-0143",
    email: "support@apexmedlaw.com",
  },
  sectionC: {
    firms: [
      { id: "f-prime", role: "Prime", name: "ApexMedLaw, LLC", address: "3344 Peachtree Rd NE, Suite 800, Atlanta, GA 30326", checkIfBranch: false },
      { id: "f-nlc", role: "Subconsultant", name: "Neurology Legal Consulting", address: "3344 Peachtree Rd NE, Suite 820, Atlanta, GA 30326", checkIfBranch: true },
      { id: "f-neura", role: "Subconsultant", name: "NeuraHealth Telemedicine PC", address: "421 Fayetteville St, Suite 1100, Raleigh, NC 27601", checkIfBranch: false },
      { id: "f-cason", role: "Subconsultant", name: "Cason Plastic Surgery PLLC", address: "8230 Walnut Hill Ln, Suite 700, Dallas, TX 75231", checkIfBranch: false },
      { id: "f-jv", role: "JV Partner", name: "Atlantic Forensic Pathology Group", address: "1201 S Orlando Ave, Winter Park, FL 32789", checkIfBranch: false },
    ],
  },
  sectionD: {
    imageDataUrl: null,
    textDescription: `ApexMedLaw, LLC  (Prime Contractor)
│
├─ Neurology Legal Consulting  —  Abhi Kapuria, MD (Principal)
│   ├─ Varsha Reddy, JD  (Legal Operations)
│   └─ Samyah Ali  (International Coordination)
│
├─ NeuraHealth Telemedicine PC  —  Ovais Inamullah, MD (Medical Director)
│   └─ Arya Shah  (Clinical Systems / EMR)
│
├─ Cason Plastic Surgery PLLC  —  Roger Cason, MD (Reconstructive Lead)
│
└─ Atlantic Forensic Pathology Group  —  Elena Marchetti, MD (Forensic Consultant)`,
    activeTab: "text",
  },
  sectionE: {
    personnel: [
      {
        id: "p-kapuria",
        name: "Abhi Kapuria, MD",
        role: "Principal Investigator / Lead Neurology Expert",
        yearsTotal: 12, yearsFirm: 6,
        firm: "ApexMedLaw, LLC",
        education: "MD — Emory University School of Medicine, 2014\nResidency in Neurology — Emory University Hospital, 2018\nBS Biochemistry (Highest Honors) — Georgia Institute of Technology, 2010",
        registration: "Licensed Physician — Georgia (2018), active\nBoard Certified, Neurology — ABPN (2019)\nInterstate Medical Licensure Compact — 24 states",
        otherQualifications: "Over 250 medical-legal expert reviews spanning federal disability, malpractice, and personal-injury matters. Published reviewer, Journal of Neurology & Legal Medicine. Federal contracting experience across VA, DOJ, GSA, DOD, USPTO.",
        relevantProjects: [
          { id: "rp-1", title: "VA OGC Disability Appeals Expert Panel", location: "Atlanta, GA", yearCompleted: "2024", yearConstruction: "", cost: "$450,000", role: "Principal Reviewer", scope: "Medical-legal review of 40+ VA disability appeals including cognitive impairment and TBI cases.", fee: "$120,000" },
          { id: "rp-2", title: "DOJ Federal Malpractice Review Panel", location: "Washington, DC", yearCompleted: "2023", yearConstruction: "", cost: "$220,000", role: "Expert Witness", scope: "Written opinions and deposition testimony in federal malpractice actions.", fee: "$85,000" },
          { id: "rp-3", title: "Emory Academic Faculty Expert Review Service", location: "Atlanta, GA", yearCompleted: "2022", yearConstruction: "", cost: "$95,000", role: "Lead Reviewer", scope: "Academic medical-legal review pipeline for intake-level cases.", fee: "$28,000" },
        ],
      },
      {
        id: "p-inamullah",
        name: "Ovais Inamullah, MD",
        role: "Co-Principal / Neurohospitalist Expert",
        yearsTotal: 10, yearsFirm: 4,
        firm: "NeuraHealth Telemedicine PC",
        education: "MD — Duke University School of Medicine, 2015\nResidency in Neurology — Duke University Hospital, 2019\nBA Neuroscience — Duke University, 2011",
        registration: "Licensed Physician — North Carolina (2019), California (2021), Texas (2022)\nBoard Certified, Neurology — ABPN (2020)",
        otherQualifications: "Telemedicine neurology specialist. 80+ expert opinions in acute stroke, neurohospitalist standards of care, and post-discharge neurological management.",
        relevantProjects: [
          { id: "rp-4", title: "NC DOJ Stroke Quality Review Panel", location: "Raleigh, NC", yearCompleted: "2024", yearConstruction: "", cost: "$180,000", role: "Expert Reviewer", scope: "Acute stroke care quality reviews for state-funded hospitals.", fee: "$60,000" },
          { id: "rp-5", title: "Fort Bragg Neurology Expert Panel", location: "Fort Bragg, NC", yearCompleted: "2022", yearConstruction: "", cost: "$160,000", role: "Expert Reviewer", scope: "Service-member neurological injury claim panel for DOD OGC.", fee: "$55,000" },
        ],
      },
      {
        id: "p-cason",
        name: "Roger Cason, MD",
        role: "Reconstructive Plastic Surgery Expert",
        yearsTotal: 15, yearsFirm: 2,
        firm: "Cason Plastic Surgery PLLC",
        education: "MD — UT Southwestern Medical Center, 2011\nPlastic Surgery Residency — Baylor College of Medicine, 2018\nBS Biomedical Engineering — Rice University, 2007",
        registration: "Licensed Physician — Texas (2018), active\nBoard Certified, Plastic Surgery — ABPS (2020)",
        otherQualifications: "Specializes in reconstructive opinions for trauma, oncologic, and federal medical-legal reviews. 60+ prior expert engagements.",
        relevantProjects: [
          { id: "rp-6", title: "VA Reconstructive Surgery Review — Dallas Region", location: "Dallas, TX", yearCompleted: "2024", yearConstruction: "", cost: "$140,000", role: "Consulting Expert", scope: "Reconstructive surgery opinions on veteran facial trauma claims.", fee: "$48,000" },
        ],
      },
      {
        id: "p-reddy",
        name: "Varsha Reddy, JD",
        role: "Legal Operations Lead",
        yearsTotal: 8, yearsFirm: 4,
        firm: "Neurology Legal Consulting",
        education: "JD — Emory University School of Law, 2017\nBA Political Science — University of Georgia, 2014",
        registration: "Licensed Attorney — Georgia (2017)\nFederal Bar Admission — Northern District of Georgia",
        otherQualifications: "Manages case intake, conflict checks, and legal review coordination across 4 federal medical-legal engagements. Expert witness preparation specialist.",
        relevantProjects: [
          { id: "rp-7", title: "ApexMedLaw Case Management System", location: "Atlanta, GA", yearCompleted: "2024", yearConstruction: "", cost: "$220,000", role: "Project Manager", scope: "Legal operations framework supporting all ApexMedLaw federal engagements.", fee: "$60,000" },
        ],
      },
      {
        id: "p-marchetti",
        name: "Elena Marchetti, MD",
        role: "Forensic Pathology Consultant",
        yearsTotal: 18, yearsFirm: 1,
        firm: "Atlantic Forensic Pathology Group",
        education: "MD — Johns Hopkins University School of Medicine, 2008\nForensic Pathology Fellowship — Miami-Dade Medical Examiner, 2014",
        registration: "Licensed Physician — Florida (2014), active\nBoard Certified, Anatomic and Clinical Pathology — ABP (2013)\nBoard Certified, Forensic Pathology — ABP (2015)",
        otherQualifications: "Former Deputy Chief Medical Examiner, Miami-Dade. 200+ autopsies annually. Expert witness in federal and state homicide and death-in-custody cases.",
        relevantProjects: [],
      },
    ],
  },
  sectionF: {
    projects: [
      {
        id: "proj-va-atl", title: "VA Atlanta Medical Center — Disability Appeals Review Contract", location: "Atlanta, GA",
        yearCompleted: "2024", yearConstructionCompleted: "",
        projectOwner: "U.S. Department of Veterans Affairs",
        pointOfContact: "Attorney Rebecca Holmes, VA OGC", pointOfContactPhone: "(404) 555-0199",
        briefDescription: "Multi-year expert witness and medical review contract covering VA disability benefit appeals. Role: Prime contractor delivering board-certified neurology and reconstructive surgery opinions. Total contract value $450K; ApexMedLaw fee $120K. Deliverables: written medical opinions (85), depositions (12), and BVA hearing testimony (6).",
        firmsInvolved: [
          { id: "fi1", firmName: "ApexMedLaw, LLC", role: "Prime", location: "Atlanta, GA" },
          { id: "fi2", firmName: "Neurology Legal Consulting", role: "Subconsultant", location: "Atlanta, GA" },
          { id: "fi3", firmName: "Cason Plastic Surgery PLLC", role: "Subconsultant", location: "Dallas, TX" },
        ],
      },
      {
        id: "proj-gsa-mid", title: "GSA Midwest Region — Federal Employee Injury Medical Review", location: "Kansas City, MO",
        yearCompleted: "2023", yearConstructionCompleted: "",
        projectOwner: "General Services Administration",
        pointOfContact: "Attorney James Park, GSA Regional OGC", pointOfContactPhone: "(816) 555-0122",
        briefDescription: "FECA claim medical reviews for federal employees across the GSA Midwest region. ApexMedLaw served as prime, engaging neurology and plastic surgery experts. 60+ reviews completed. Total cost $210K; ApexMedLaw fee $85K.",
        firmsInvolved: [
          { id: "fi4", firmName: "ApexMedLaw, LLC", role: "Prime", location: "Atlanta, GA" },
          { id: "fi5", firmName: "NeuraHealth Telemedicine PC", role: "Subconsultant", location: "Raleigh, NC" },
          { id: "fi6", firmName: "Cason Plastic Surgery PLLC", role: "Subconsultant", location: "Dallas, TX" },
        ],
      },
      {
        id: "proj-uspto", title: "USPTO Alexandria — Employee Medical-Legal Consultations", location: "Alexandria, VA",
        yearCompleted: "2023", yearConstructionCompleted: "",
        projectOwner: "U.S. Patent and Trademark Office",
        pointOfContact: "HR Legal Counsel — Miriam Jones", pointOfContactPhone: "(571) 555-0177",
        briefDescription: "IDIQ contract for as-needed medical opinions on federal employee injury and return-to-work cases. 24 cases delivered over 18 months. Total contract value $140K; ApexMedLaw fee $48K.",
        firmsInvolved: [
          { id: "fi7", firmName: "ApexMedLaw, LLC", role: "Prime", location: "Atlanta, GA" },
          { id: "fi8", firmName: "Neurology Legal Consulting", role: "Subconsultant", location: "Atlanta, GA" },
        ],
      },
      {
        id: "proj-dod-bragg", title: "DOD Fort Bragg — Base Neurology Expert Panel", location: "Fort Bragg, NC",
        yearCompleted: "2022", yearConstructionCompleted: "",
        projectOwner: "Department of Defense, Office of General Counsel",
        pointOfContact: "Col. Maria Thompson, JAG Corps", pointOfContactPhone: "(910) 555-0165",
        briefDescription: "Expert medical review panel for service-member neurological injury claims. NeuraHealth provided neurohospitalist expertise under ApexMedLaw prime contract. Fee $55K. 38 cases reviewed.",
        firmsInvolved: [
          { id: "fi9", firmName: "ApexMedLaw, LLC", role: "Prime", location: "Atlanta, GA" },
          { id: "fi10", firmName: "NeuraHealth Telemedicine PC", role: "Subconsultant", location: "Raleigh, NC" },
        ],
      },
      {
        id: "proj-doj-malp", title: "DOJ Civil Division — Federal Malpractice Expert Services", location: "Washington, DC",
        yearCompleted: "2022", yearConstructionCompleted: "",
        projectOwner: "U.S. Department of Justice, Civil Division",
        pointOfContact: "Senior Trial Counsel — David Okafor", pointOfContactPhone: "(202) 555-0135",
        briefDescription: "Expert witness and medical review services for federal Torts Branch defense of malpractice claims at DOD and VA facilities. 15 expert engagements over 2-year term. Fee $72K.",
        firmsInvolved: [
          { id: "fi11", firmName: "ApexMedLaw, LLC", role: "Prime", location: "Atlanta, GA" },
          { id: "fi12", firmName: "Atlantic Forensic Pathology Group", role: "JV Partner", location: "Winter Park, FL" },
        ],
      },
      {
        id: "proj-nara-death", title: "NARA-Managed Death-in-Custody Medical Review — Multi-Agency", location: "Washington, DC",
        yearCompleted: "2021", yearConstructionCompleted: "",
        projectOwner: "National Archives, on behalf of multi-agency review board",
        pointOfContact: "Review Board Coordinator — Sarah Chen", pointOfContactPhone: "(202) 555-0188",
        briefDescription: "Forensic pathology and neurology review of archived death-in-custody case files. ApexMedLaw led the neurology review; Atlantic Forensic Pathology led autopsy records review. Fee $36K.",
        firmsInvolved: [
          { id: "fi13", firmName: "ApexMedLaw, LLC", role: "Prime", location: "Atlanta, GA" },
          { id: "fi14", firmName: "Atlantic Forensic Pathology Group", role: "Subconsultant", location: "Winter Park, FL" },
        ],
      },
    ],
  },
  sectionG: {
    matrix: {
      "p-kapuria":   { "proj-va-atl": true,  "proj-gsa-mid": true,  "proj-uspto": true,  "proj-dod-bragg": false, "proj-doj-malp": true,  "proj-nara-death": true  },
      "p-inamullah": { "proj-va-atl": false, "proj-gsa-mid": true,  "proj-uspto": false, "proj-dod-bragg": true,  "proj-doj-malp": false, "proj-nara-death": false },
      "p-cason":     { "proj-va-atl": true,  "proj-gsa-mid": true,  "proj-uspto": false, "proj-dod-bragg": false, "proj-doj-malp": false, "proj-nara-death": false },
      "p-reddy":     { "proj-va-atl": true,  "proj-gsa-mid": true,  "proj-uspto": true,  "proj-dod-bragg": true,  "proj-doj-malp": true,  "proj-nara-death": true  },
      "p-marchetti": { "proj-va-atl": false, "proj-gsa-mid": false, "proj-uspto": false, "proj-dod-bragg": false, "proj-doj-malp": true,  "proj-nara-death": true  },
    },
  },
  sectionH: {
    additionalInfo: `ApexMedLaw brings a cross-specialty medical-legal review team with 40+ combined years of federal contracting experience across the VA, DOJ, GSA, DOD, USPTO, and NARA. Our multistate licensure coverage (IMLC — 24 states active under Dr. Kapuria; additional state coverage through NeuraHealth and Cason Plastic Surgery) and integrated telemedicine intake capability permit rapid response to federal medical-legal referrals — target turnaround of 10 business days for standard opinions, with rush capability at 5 business days.

Board certifications across the team include Neurology (ABPN), Plastic Surgery (ABPS), Anatomic & Clinical Pathology (ABP), and Forensic Pathology (ABP). Legal operations are led by an active Georgia-licensed attorney with federal bar admission (N.D. Ga.), permitting seamless coordination with agency counsel.

Prior federal engagements total $1.15M in delivered services. All personnel maintain active eligibility for federal security clearance processes and have completed mandatory HIPAA, federal ethics, and Protected Health Information handling training. ApexMedLaw carries $3M professional liability coverage per occurrence with endorsements specific to expert-witness and consulting services.

Upon award, the team is available for initial case referrals within 15 business days, with a fully staffed review pipeline operational at the 30-day mark.`,
  },
};
