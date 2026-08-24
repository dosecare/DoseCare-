/* =========================================
   DoseCare
   ANALGESICS / ANTIPYRETICS DATABASE

   Pediatric Oral-Liquid Medicines ONLY
========================================= */

/*
    System:
    Analgesics · Antipyretics · NSAIDs

    Scope:
    Pediatric oral liquid medicines only.

    Allowed dosage forms:
    - Syrup
    - Oral solution
    - Oral suspension

    NOT included:
    - Tablets
    - Capsules
    - Chewables
    - Suppositories
    - Injections
    - IV / IM
    - Other non-oral dosage forms

    IMPORTANT:
    Do not add these medicines to medicine.js.

    Medicines are added automatically to the
    central DoseCare database below.
*/


const analgesicMedicines = [

    /* =========================================
       PARACETAMOL
       Acetaminophen
    ========================================= */

    {

        id:
            "paracetamol",

        genericName:
            "Paracetamol",

        name:
            "Paracetamol",

        brandNames: [
            "Panadol",
            "Calpol",
            "Tylenol"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "Non-opioid analgesic",
            "Antipyretic"
        ],

        class:
            "Non-opioid Analgesic · Antipyretic",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "fever",
            "mild to moderate pain",
            "headache",
            "toothache",
            "musculoskeletal pain"
        ],

        condition:
            "Fever · Mild to moderate pain",

        route:
            "Oral",

        dosageForms: [
            "oral suspension",
            "oral solution"
        ],

        commonPediatricConcentrations: [
            "120 mg/5 mL",
            "125 mg/5 mL",
            "160 mg/5 mL"
        ],

        indications:
            "Symptomatic treatment of fever and mild to moderate pain in children.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Produces analgesic and antipyretic effects mainly through central mechanisms involving inhibition of prostaglandin synthesis. It has little clinically useful peripheral anti-inflammatory activity compared with NSAIDs.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Dose should be calculated according to body weight. The selected oral-liquid concentration must always be verified because different pediatric liquid formulations may contain different concentrations.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "mg_per_kg_per_dose",

            minDose:
                10,

            maxDose:
                15,

            frequency:
                4,

            frequencyText:
                "Every 4–6 hours as required",

            interval:
                "Every 4–6 hours as required",

            intervalHours:
                6,

            frequencyPerDay:
                4,

            maxDosesPer24Hours:
                4,

            maxDailyDose:
                60,

            unit:
                "mg/kg/dose",

            dailyUnit:
                "mg/kg/day",

            route:
                "oral",

            configured:
                true

        },


        /* ---------------------------------
           INDICATION SPECIFIC
        --------------------------------- */

        indicationSpecific:
            false,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [

            "Known hypersensitivity to paracetamol",

            "Severe hepatic impairment"

        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [

            "Hepatic impairment",

            "Malnutrition",

            "Dehydration",

            "Concomitant use of other paracetamol or acetaminophen-containing medicines",

            "Verify the concentration of the oral liquid before calculating the volume",

            "Avoid exceeding the recommended total daily dose"

        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [

            "Nausea",

            "Vomiting",

            "Skin reactions",

            "Hepatotoxicity in overdose"

        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Dose according to body weight. Always verify the formulation concentration before converting mg to mL. Do not administer more than one paracetamol/acetaminophen-containing medicine at the same time. Maximum routine pediatric daily dose configured in DoseCare is 60 mg/kg/day.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {

                organization:
                    "World Health Organization",

                title:
                    "WHO Model Formulary for Children",

                year:
                    2010,

                url:
                    "https://www.who.int/publications/i/item/9789241599320"

            },

            {

                organization:
                    "World Health Organization",

                title:
                    "The WHO AWaRe Antibiotic Book",

                year:
                    2022,

                url:
                    "https://iris.who.int/handle/10665/365237"

            },

            {

                organization:
                    "U.S. National Library of Medicine",

                title:
                    "DailyMed - Children's Acetaminophen Oral Suspension 160 mg/5 mL",

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=38b839b6-de7d-4f33-a19a-efc92cdad2c"

            },

            {

                organization:
                    "World Health Organization",

                title:
                    "WHO IMCI Chart Booklet",

                url:
                    "https://cdn.who.int/media/docs/default-source/mca-documents/child/imci-integrated-management-of-childhood-illness/imci-in-service-training/imci-chart-booklet.pdf"

            }

        ]

    },


    /* =========================================
       IBUPROFEN
    ========================================= */

    {

        id:
            "ibuprofen",

        genericName:
            "Ibuprofen",

        name:
            "Ibuprofen",

        brandNames: [
            "Brufen",
            "Nurofen",
            "Advil"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "NSAID",
            "Non-opioid analgesic",
            "Antipyretic",
            "Anti-inflammatory"
        ],

        class:
            "NSAID · Analgesic · Antipyretic · Anti-inflammatory",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "fever",
            "mild to moderate pain",
            "inflammation",
            "headache",
            "toothache",
            "musculoskeletal pain"
        ],

        condition:
            "Fever · Pain · Inflammation",

        route:
            "Oral",

        dosageForms: [
            "oral suspension"
        ],

        commonPediatricConcentrations: [
            "100 mg/5 mL"
        ],

        indications:
            "Symptomatic treatment of fever and mild to moderate pain, with anti-inflammatory activity in appropriate pediatric patients.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Reversibly inhibits cyclooxygenase enzymes COX-1 and COX-2, reducing prostaglandin synthesis and producing analgesic, antipyretic and anti-inflammatory effects.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Ibuprofen is not recommended for children younger than 3 months. Use should take account of hydration status, renal function and the clinical condition.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "mg_per_kg_per_dose",

            minDose:
                5,

            maxDose:
                10,

            frequency:
                4,

            frequencyText:
                "Every 6–8 hours as required",

            interval:
                "Every 6–8 hours as required",

            intervalHours:
                6,

            frequencyPerDay:
                4,

            maxDosesPer24Hours:
                4,

            maxDailyDose:
                40,

            unit:
                "mg/kg/dose",

            dailyUnit:
                "mg/kg/day",

            route:
                "oral",

            minimumAgeMonths:
                3,

            underThreeMonths:
                "not_recommended",

            configured:
                true

        },


        /* ---------------------------------
           INDICATION SPECIFIC
        --------------------------------- */

        indicationSpecific:
            false,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [

            "Known hypersensitivity to ibuprofen or other NSAIDs",

            "History of asthma, urticaria or allergic-type reactions after aspirin or other NSAIDs",

            "Active gastrointestinal bleeding",

            "Active peptic ulcer disease",

            "Severe renal impairment"

        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [

            "Dehydration",

            "Renal impairment",

            "History of gastrointestinal ulceration or bleeding",

            "NSAID hypersensitivity or aspirin-sensitive asthma",

            "Bleeding disorders",

            "Concomitant medicines that increase bleeding risk",

            "Use the lowest effective dose for the shortest appropriate duration"

        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [

            "Nausea",

            "Vomiting",

            "Dyspepsia",

            "Gastrointestinal irritation",

            "Gastrointestinal bleeding",

            "Renal impairment",

            "Hypersensitivity reactions",

            "Fluid retention"

        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Do not use in children younger than 3 months. Avoid use in dehydrated children because of increased renal risk. Verify weight, age, hydration status, renal function and formulation concentration before administration. Do not exceed 4 doses in 24 hours in the configured regimen.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {

                organization:
                    "World Health Organization",

                title:
                    "WHO Model Formulary for Children",

                year:
                    2010,

                url:
                    "https://www.who.int/publications/i/item/9789241599320"

            },

            {

                organization:
                    "World Health Organization",

                title:
                    "The WHO AWaRe Antibiotic Book",

                year:
                    2022,

                url:
                    "https://iris.who.int/handle/10665/365237"

            },

            {

                organization:
                    "U.S. National Library of Medicine",

                title:
                    "DailyMed - Children's Ibuprofen Oral Suspension 100 mg/5 mL",

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=92878aad-0bf9-4303-a1f8-4b9b23848a71"

            }

        ]

    },


    /* =========================================
       NAPROXEN
    ========================================= */

    {

        id:
            "naproxen",

        genericName:
            "Naproxen",

        name:
            "Naproxen",

        brandNames: [
            "Naprosyn"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "NSAID",
            "Non-opioid analgesic",
            "Anti-inflammatory"
        ],

        class:
            "NSAID · Analgesic · Anti-inflammatory",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "polyarticular juvenile idiopathic arthritis"
        ],

        condition:
            "Polyarticular Juvenile Idiopathic Arthritis",

        route:
            "Oral",

        dosageForms: [
            "oral suspension"
        ],

        commonPediatricConcentrations: [
            "125 mg/5 mL"
        ],

        indications:
            "Management of polyarticular juvenile idiopathic arthritis in children 2 years of age and older.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Inhibits cyclooxygenase enzymes and reduces prostaglandin synthesis, producing analgesic and anti-inflammatory effects.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Naproxen oral suspension is recommended for juvenile arthritis in children 2 years of age and older. Pediatric dosing in the referenced prescribing information is weight-based and divided into two daily doses.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "condition_based",

            conditionBased: [

                {

                    condition:
                        "Polyarticular Juvenile Idiopathic Arthritis",

                    indication:
                        "Polyarticular Juvenile Idiopathic Arthritis",

                    label:
                        "Polyarticular Juvenile Idiopathic Arthritis",

                    type:
                        "mg_per_kg_per_day",

                    minDose:
                        10,

                    maxDose:
                        10,

                    frequency:
                        2,

                    frequencyText:
                        "Twice daily",

                    interval:
                        "Every 12 hours",

                    intervalHours:
                        12,

                    frequencyPerDay:
                        2,

                    unit:
                        "mg/kg/day",

                    dailyUnit:
                        "mg/kg/day",

                    route:
                        "oral",

                    minimumAgeYears:
                        2,

                    configured:
                        true

                }

            ],

            minimumAgeYears:
                2,

            route:
                "oral",

            configured:
                true

        },


        /* ---------------------------------
           INDICATION SPECIFIC
        --------------------------------- */

        indicationSpecific:
            true,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [

            "Known hypersensitivity to naproxen or any component of the product",

            "History of asthma, urticaria or allergic-type reactions after aspirin or other NSAIDs",

            "Use in the setting of coronary artery bypass graft surgery"

        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [

            "Renal impairment",

            "Dehydration or hypovolemia",

            "History of gastrointestinal ulceration or bleeding",

            "Heart failure",

            "Hypertension",

            "Hepatic impairment",

            "NSAID hypersensitivity",

            "Use the lowest effective dose for the shortest appropriate duration",

            "Different naproxen formulations and strengths are not automatically interchangeable"

        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [

            "Dyspepsia",

            "Nausea",

            "Vomiting",

            "Gastrointestinal ulceration",

            "Gastrointestinal bleeding",

            "Renal impairment",

            "Fluid retention",

            "Hypertension",

            "Hypersensitivity reactions"

        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "For DoseCare pediatric use, naproxen is configured only for the evidence-supported pediatric indication of polyarticular juvenile idiopathic arthritis in children 2 years and older. The recommended total daily dose is approximately 10 mg/kg/day divided into two doses. The oral suspension concentration is 125 mg/5 mL. Do not use the adult pain regimen as a pediatric regimen.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {

                organization:
                    "U.S. Food and Drug Administration / DailyMed",

                title:
                    "Naproxen Oral Suspension - Prescribing Information",

                year:
                    2025,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=570974d4-0d5b-4df2-b307-37380511835d"

            },

            {

                organization:
                    "U.S. Food and Drug Administration",

                title:
                    "NAPROSYN Suspension Prescribing Information",

                year:
                    2024,

                url:
                    "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/018965s028lbl.pdf"

            }

        ]

    }

];


/* =========================================
   ADD ANALGESICS TO DOSECARE DATABASE
========================================= */

analgesicMedicines.forEach(
    medicine => {

        if (
            !medicines.some(
                existingMedicine =>
                    existingMedicine.id ===
                    medicine.id
            )
        ) {

            medicines.push(
                medicine
            );

        }

    }
);
/* =========================================
   DoseCare
   ANALGESICS / ANTIPYRETICS DATABASE

   Pediatric Oral-Liquid Medicines ONLY
========================================= */

/*
    System:
    Analgesics · Antipyretics · NSAIDs

    Scope:
    Pediatric oral liquid medicines only.

    Allowed dosage forms:
    - Syrup
    - Oral solution
    - Oral suspension

    NOT included:
    - Tablets
    - Capsules
    - Chewables
    - Suppositories
    - Injections
    - IV / IM
    - Other non-oral dosage forms

    IMPORTANT:
    Do not add these medicines to medicine.js.

    Medicines are added automatically to the
    central DoseCare database below.
*/


const analgesicMedicines = [

    /* =========================================
       PARACETAMOL
       Acetaminophen
    ========================================= */

    {

        id:
            "paracetamol",

        genericName:
            "Paracetamol",

        name:
            "Paracetamol",

        brandNames: [
            "Panadol",
            "Calpol",
            "Tylenol"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "Non-opioid analgesic",
            "Antipyretic"
        ],

        class:
            "Non-opioid Analgesic · Antipyretic",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "fever",
            "mild to moderate pain",
            "headache",
            "toothache",
            "musculoskeletal pain"
        ],

        condition:
            "Fever · Mild to moderate pain",

        route:
            "Oral",

        dosageForms: [
            "oral solution",
            "oral suspension"
        ],

        commonPediatricConcentrations: [
            "120 mg/5 mL",
            "125 mg/5 mL",
            "160 mg/5 mL"
        ],

        indications:
            "Symptomatic treatment of fever and mild to moderate pain in children.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Produces analgesic and antipyretic effects mainly through central mechanisms involving inhibition of prostaglandin synthesis. It has little clinically useful peripheral anti-inflammatory activity compared with NSAIDs.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Dose should be calculated according to body weight. The selected oral-liquid concentration must always be verified because different pediatric liquid formulations may contain different concentrations.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "mg_per_kg_per_dose",

            minDose:
                10,

            maxDose:
                15,

            frequency:
                4,

            frequencyText:
                "Every 4–6 hours as required",

            interval:
                "Every 4–6 hours as required",

            intervalHours:
                6,

            frequencyPerDay:
                4,

            maxDosesPer24Hours:
                4,

            maxDailyDose:
                60,

            unit:
                "mg/kg/dose",

            dailyUnit:
                "mg/kg/day",

            route:
                "oral",

            configured:
                true

        },


        indicationSpecific:
            false,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [

            "Known hypersensitivity to paracetamol",

            "Severe hepatic impairment"

        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [

            "Hepatic impairment",

            "Malnutrition",

            "Dehydration",

            "Concomitant use of other paracetamol or acetaminophen-containing medicines",

            "Verify the concentration of the oral liquid before calculating the volume",

            "Avoid exceeding the recommended total daily dose"

        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [

            "Nausea",

            "Vomiting",

            "Skin reactions",

            "Hepatotoxicity in overdose"

        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Dose according to body weight. Always verify the formulation concentration before converting mg to mL. Do not administer more than one paracetamol/acetaminophen-containing medicine at the same time. Maximum routine pediatric daily dose configured in DoseCare is 60 mg/kg/day.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model Formulary for Children",

                year:
                    2010,

                url:
                    "https://www.who.int/publications/i/item/9789241599320"
            },

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO AWaRe Antibiotic Book",

                year:
                    2022,

                url:
                    "https://iris.who.int/handle/10665/365237"
            },

            {
                organization:
                    "U.S. National Library of Medicine",

                title:
                    "DailyMed - Acetaminophen Oral Suspension",

                url:
                    "https://dailymed.nlm.nih.gov/"
            }

        ]

    },


    /* =========================================
       IBUPROFEN
    ========================================= */

    {

        id:
            "ibuprofen",

        genericName:
            "Ibuprofen",

        name:
            "Ibuprofen",

        brandNames: [
            "Brufen",
            "Nurofen",
            "Advil"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "NSAID",
            "Non-opioid analgesic",
            "Antipyretic",
            "Anti-inflammatory"
        ],

        class:
            "NSAID · Analgesic · Antipyretic · Anti-inflammatory",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "fever",
            "mild to moderate pain",
            "inflammation",
            "headache",
            "toothache",
            "musculoskeletal pain"
        ],

        condition:
            "Fever · Pain · Inflammation",

        route:
            "Oral",

        dosageForms: [
            "oral suspension"
        ],

        commonPediatricConcentrations: [
            "100 mg/5 mL"
        ],

        indications:
            "Symptomatic treatment of fever and mild to moderate pain, with anti-inflammatory activity in appropriate pediatric patients.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Reversibly inhibits cyclooxygenase enzymes COX-1 and COX-2, reducing prostaglandin synthesis and producing analgesic, antipyretic and anti-inflammatory effects.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Ibuprofen oral suspension is used in pediatric patients for fever, mild to moderate pain and juvenile arthritis. Dose selection depends on age, body weight and clinical indication.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "mg_per_kg_per_dose",

            minDose:
                5,

            maxDose:
                10,

            frequency:
                4,

            frequencyText:
                "Every 6–8 hours as required",

            interval:
                "Every 6–8 hours as required",

            intervalHours:
                6,

            frequencyPerDay:
                4,

            maxDosesPer24Hours:
                4,

            maxDailyDose:
                40,

            unit:
                "mg/kg/dose",

            dailyUnit:
                "mg/kg/day",

            route:
                "oral",

            minimumAgeMonths:
                3,

            underThreeMonths:
                "not_recommended",

            configured:
                true

        },


        indicationSpecific:
            false,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [

            "Known hypersensitivity to ibuprofen or other NSAIDs",

            "History of asthma, urticaria or allergic-type reactions after aspirin or other NSAIDs",

            "Active gastrointestinal bleeding",

            "Active peptic ulcer disease",

            "Severe renal impairment"

        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [

            "Dehydration",

            "Renal impairment",

            "History of gastrointestinal ulceration or bleeding",

            "NSAID hypersensitivity or aspirin-sensitive asthma",

            "Bleeding disorders",

            "Concomitant medicines that increase bleeding risk",

            "Use the lowest effective dose for the shortest appropriate duration"

        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [

            "Nausea",

            "Vomiting",

            "Dyspepsia",

            "Gastrointestinal irritation",

            "Gastrointestinal bleeding",

            "Renal impairment",

            "Hypersensitivity reactions",

            "Fluid retention"

        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Verify age, weight, hydration status, renal status and formulation concentration before administration. Avoid use in dehydrated children because of increased renal risk. Do not exceed 40 mg/kg/day in the configured pediatric regimen.",


        references: [

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model Formulary for Children",

                year:
                    2010,

                url:
                    "https://www.who.int/publications/i/item/9789241599320"
            },

            {
                organization:
                    "U.S. National Library of Medicine",

                title:
                    "DailyMed - Ibuprofen Oral Suspension USP 100 mg/5 mL",

                url:
                    "https://dailymed.nlm.nih.gov/"
            }

        ]

    },


    /* =========================================
       NAPROXEN
    ========================================= */

    {

        id:
            "naproxen",

        genericName:
            "Naproxen",

        name:
            "Naproxen",

        brandNames: [
            "Naprosyn"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "NSAID",
            "Non-opioid analgesic",
            "Anti-inflammatory"
        ],

        class:
            "NSAID · Analgesic · Anti-inflammatory",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "polyarticular juvenile idiopathic arthritis"
        ],

        condition:
            "Polyarticular Juvenile Idiopathic Arthritis",

        route:
            "Oral",

        dosageForms: [
            "oral suspension"
        ],

        commonPediatricConcentrations: [
            "125 mg/5 mL"
        ],

        indications:
            "Management of polyarticular juvenile idiopathic arthritis in children 2 years of age and older.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Inhibits cyclooxygenase enzymes and reduces prostaglandin synthesis, producing analgesic and anti-inflammatory effects.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Naproxen oral suspension is recommended for juvenile arthritis in children 2 years of age and older because the liquid formulation allows flexible weight-based dose titration.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "condition_based",

            conditionBased: [

                {

                    condition:
                        "Polyarticular Juvenile Idiopathic Arthritis",

                    indication:
                        "Polyarticular Juvenile Idiopathic Arthritis",

                    label:
                        "Polyarticular Juvenile Idiopathic Arthritis",

                    type:
                        "mg_per_kg_per_day",

                    minDose:
                        10,

                    maxDose:
                        10,

                    frequency:
                        2,

                    frequencyText:
                        "Twice daily",

                    interval:
                        "Every 12 hours",

                    intervalHours:
                        12,

                    frequencyPerDay:
                        2,

                    unit:
                        "mg/kg/day",

                    dailyUnit:
                        "mg/kg/day",

                    route:
                        "oral",

                    minimumAgeYears:
                        2,

                    configured:
                        true

                }

            ],

            minimumAgeYears:
                2,

            route:
                "oral",

            configured:
                true

        },


        indicationSpecific:
            true,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [

            "Known hypersensitivity to naproxen or any component of the product",

            "History of asthma, urticaria or allergic-type reactions after aspirin or other NSAIDs",

            "Use in the setting of coronary artery bypass graft surgery"

        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [

            "Renal impairment",

            "Dehydration or hypovolemia",

            "History of gastrointestinal ulceration or bleeding",

            "Heart failure",

            "Hypertension",

            "Hepatic impairment",

            "NSAID hypersensitivity",

            "Use the lowest effective dose for the shortest appropriate duration",

            "Different naproxen formulations and strengths are not automatically interchangeable"

        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [

            "Dyspepsia",

            "Nausea",

            "Vomiting",

            "Gastrointestinal ulceration",

            "Gastrointestinal bleeding",

            "Renal impairment",

            "Fluid retention",

            "Hypertension",

            "Hypersensitivity reactions"

        ],


        notes:
            "For DoseCare pediatric use, naproxen is configured for polyarticular juvenile idiopathic arthritis in children 2 years and older. Recommended total daily dose is approximately 10 mg/kg/day divided into two doses.",


        references: [

            {
                organization:
                    "U.S. National Library of Medicine",

                title:
                    "DailyMed - Naproxen Oral Suspension",

                year:
                    2025,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=570974d4-0d5b-4df2-b307-37380511835d"
            }

        ]

    },


    /* =========================================
       MELOXICAM
    ========================================= */

    {

        id:
            "meloxicam",

        genericName:
            "Meloxicam",

        name:
            "Meloxicam",

        brandNames: [
            "Mobic",
            "Zybic"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "NSAID",
            "Non-opioid analgesic",
            "Anti-inflammatory"
        ],

        class:
            "NSAID · Analgesic · Anti-inflammatory",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "juvenile rheumatoid arthritis",
            "pauciarticular juvenile rheumatoid arthritis",
            "polyarticular juvenile rheumatoid arthritis"
        ],

        condition:
            "Juvenile Rheumatoid Arthritis",

        route:
            "Oral",

        dosageForms: [
            "oral suspension"
        ],

        commonPediatricConcentrations: [
            "7.5 mg/5 mL"
        ],

        indications:
            "Relief of signs and symptoms of pauciarticular or polyarticular juvenile rheumatoid arthritis in patients 2 years of age and older.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Meloxicam inhibits cyclooxygenase-mediated prostaglandin synthesis, producing analgesic and anti-inflammatory effects.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Meloxicam oral suspension is specifically useful for accurate weight-based dosing in children with juvenile rheumatoid arthritis. The pediatric suspension is indicated for patients 2 years of age and older.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "mg_per_kg_per_dose",

            minDose:
                0.125,

            maxDose:
                0.125,

            frequency:
                1,

            frequencyText:
                "Once daily",

            interval:
                "Every 24 hours",

            intervalHours:
                24,

            frequencyPerDay:
                1,

            maxDailyDose:
                7.5,

            unit:
                "mg/kg/dose",

            dailyUnit:
                "mg/kg/day",

            route:
                "oral",

            minimumAgeYears:
                2,

            indication:
                "Juvenile Rheumatoid Arthritis",

            configured:
                true

        },


        indicationSpecific:
            true,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [

            "Known hypersensitivity to meloxicam or any component of the product",

            "History of asthma, urticaria or other allergic-type reactions after aspirin or other NSAIDs",

            "Use in the setting of coronary artery bypass graft surgery"

        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [

            "Renal impairment",

            "Dehydration",

            "Hypovolemia",

            "History of gastrointestinal ulceration or bleeding",

            "Heart failure",

            "Hypertension",

            "Hepatic impairment",

            "NSAID hypersensitivity",

            "Use the lowest effective dose for the shortest appropriate duration",

            "Meloxicam oral suspension is not interchangeable with other approved meloxicam formulations on a mg-for-mg basis"

        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [

            "Dyspepsia",

            "Nausea",

            "Vomiting",

            "Abdominal pain",

            "Gastrointestinal bleeding",

            "Renal impairment",

            "Edema",

            "Hypertension",

            "Hypersensitivity reactions"

        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "For juvenile rheumatoid arthritis, the recommended pediatric oral suspension dose is 0.125 mg/kg once daily up to a maximum of 7.5 mg/day. The suspension concentration is 7.5 mg/5 mL. Do not automatically substitute another meloxicam formulation for this suspension on a mg-for-mg basis.",


        references: [

            {
                organization:
                    "U.S. National Library of Medicine",

                title:
                    "DailyMed - Meloxicam Oral Suspension",

                year:
                    2024,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4ddf5a4d-8e84-419d-8e3a-c91b85501885"
            }

        ]

    },


    /* =========================================
       MEFENAMIC ACID
    ========================================= */

    {

        id:
            "mefenamic-acid",

        genericName:
            "Mefenamic Acid",

        name:
            "Mefenamic Acid",

        brandNames: [
            "Mefenamic Acid Suspension"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "NSAID",
            "Non-opioid analgesic",
            "Antipyretic",
            "Anti-inflammatory"
        ],

        class:
            "NSAID · Analgesic · Antipyretic · Anti-inflammatory",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "pain",
            "fever",
            "musculoskeletal pain",
            "dental pain",
            "headache",
            "traumatic pain"
        ],

        condition:
            "Pain · Fever · Inflammation",

        route:
            "Oral",

        dosageForms: [
            "oral suspension"
        ],

        commonPediatricConcentrations: [
            "50 mg/5 mL"
        ],

        indications:
            "Symptomatic relief of pain and pyrexia in children and anti-inflammatory analgesic treatment in appropriate conditions.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Mefenamic acid is a non-steroidal anti-inflammatory medicine that inhibits prostaglandin activity, producing analgesic, antipyretic and anti-inflammatory effects.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "The referenced pediatric product information recommends the 50 mg/5 mL suspension for children over 6 months and under 12 years of age. The source also provides age-based dosing and a weight-based daily dose reference.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "mg_per_kg_per_day",

            minDose:
                25,

            maxDose:
                25,

            frequency:
                3,

            frequencyText:
                "Up to three times daily",

            interval:
                "Up to three times daily",

            frequencyPerDay:
                3,

            unit:
                "mg/kg/day",

            dailyUnit:
                "mg/kg/day",

            route:
                "oral",

            minimumAgeMonths:
                6,

            maximumAgeYears:
                12,

            duration:
                "Maximum 7 days in children except for Still's disease",

            configured:
                true

        },


        /* ---------------------------------
           AGE-BASED REFERENCE
        ---------------------------------

           These values are retained as source
           information. The active calculator
           regimen uses the documented
           25 mg/kg/day weight-based reference.
        --------------------------------- */

        pediatricAgeBasedReference: [

            {
                age:
                    "6 months to under 2 years",

                dose:
                    "5 mL per dose",

                concentration:
                    "50 mg/5 mL",

                maximumFrequency:
                    "Up to 3 times daily"
            },

            {
                age:
                    "2 years to under 5 years",

                dose:
                    "10 mL per dose",

                concentration:
                    "50 mg/5 mL",

                maximumFrequency:
                    "Up to 3 times daily"
            },

            {
                age:
                    "5 years to under 9 years",

                dose:
                    "15 mL per dose",

                concentration:
                    "50 mg/5 mL",

                maximumFrequency:
                    "Up to 3 times daily"
            },

            {
                age:
                    "9 years to under 12 years",

                dose:
                    "20 mL per dose",

                concentration:
                    "50 mg/5 mL",

                maximumFrequency:
                    "Up to 3 times daily"
            }

        ],


        indicationSpecific:
            false,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [

            "Known hypersensitivity to mefenamic acid or other NSAIDs",

            "Inflammatory bowel disease",

            "History of gastrointestinal bleeding or perforation related to NSAID therapy",

            "Active or recurrent peptic ulceration or hemorrhage",

            "Severe heart failure",

            "Severe hepatic failure",

            "Severe renal failure",

            "NSAID-induced asthma, bronchospasm, rhinitis, angioedema or urticaria"

        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [

            "Dehydration",

            "Renal disease",

            "Hepatic impairment",

            "Cardiac impairment",

            "History of gastrointestinal disease",

            "Asthma",

            "Bleeding disorders",

            "Concomitant anticoagulants or antiplatelet medicines",

            "Concomitant use of other NSAIDs",

            "Use the lowest effective dose for the shortest appropriate duration"

        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [

            "Nausea",

            "Vomiting",

            "Diarrhea",

            "Dyspepsia",

            "Abdominal pain",

            "Gastrointestinal ulceration",

            "Gastrointestinal bleeding",

            "Renal impairment",

            "Hypersensitivity reactions",

            "Skin reactions"

        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "The referenced product is a 50 mg/5 mL oral suspension. Pediatric information applies to children over 6 months and under 12 years. The product information gives a weight-based reference of 25 mg/kg/day in divided doses and also provides age-based dose volumes. Doses may be repeated up to three times daily. Except for Still's disease, treatment in children should not continue longer than 7 days. Prefer administration with or after food.",


        references: [

            {
                organization:
                    "Electronic Medicines Compendium",

                title:
                    "Mefenamic Acid 50 mg/5 ml Suspension - Summary of Product Characteristics",

                year:
                    2025,

                url:
                    "https://www.medicines.org.uk/emc/product/13316/smpc"
            }

        ]

    },


    /* =========================================
       CELECOXIB
       VYSCOXA
    ========================================= */

    {

        id:
            "celecoxib",

        genericName:
            "Celecoxib",

        name:
            "Celecoxib",

        brandNames: [
            "VYSCOXA"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "NSAID",
            "COX-2 selective inhibitor",
            "Anti-inflammatory",
            "Analgesic"
        ],

        class:
            "NSAID · COX-2 Selective Inhibitor · Analgesic · Anti-inflammatory",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "juvenile rheumatoid arthritis"
        ],

        condition:
            "Juvenile Rheumatoid Arthritis",

        route:
            "Oral",

        dosageForms: [
            "oral suspension"
        ],

        commonPediatricConcentrations: [
            "10 mg/mL",
            "50 mg/5 mL"
        ],

        indications:
            "Management of the signs and symptoms of juvenile rheumatoid arthritis in pediatric patients 2 years of age and older.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Celecoxib selectively inhibits cyclooxygenase-2 (COX-2), reducing prostaglandin synthesis involved in pain and inflammation.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Celecoxib oral suspension is indicated for juvenile rheumatoid arthritis in pediatric patients 2 years of age and older. The VYSCOXA prescribing information uses fixed weight-band dosing rather than a simple mg/kg formula.",


        /* ---------------------------------
           DOSING
        ---------------------------------

           IMPORTANT:
           The current DoseCare calculator does
           not yet support weight-band dosing.

           DO NOT convert these doses into
           mg/kg because doing so would produce
           an incorrect regimen.

           Weight-band engine will be added later.
        --------------------------------- */

        dosing: {

            configured:
                false,

            calculatorReady:
                false,

            type:
                "weight_band",

            indication:
                "Juvenile Rheumatoid Arthritis",

            minimumAgeYears:
                2,

            frequency:
                2,

            frequencyText:
                "Twice daily",

            interval:
                "Every 12 hours",

            intervalHours:
                12,

            route:
                "oral",

            weightBands: [

                {

                    minWeightKg:
                        10,

                    maxWeightKg:
                        25,

                    doseMg:
                        50,

                    doseVolumeMl:
                        5,

                    frequency:
                        2,

                    intervalHours:
                        12

                },

                {

                    minWeightKg:
                        25.01,

                    doseMg:
                        100,

                    doseVolumeMl:
                        10,

                    frequency:
                        2,

                    intervalHours:
                        12

                }

            ]

        },


        /* ---------------------------------
           INDICATION SPECIFIC
        --------------------------------- */

        indicationSpecific:
            true,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [

            "Known hypersensitivity to celecoxib",

            "Hypersensitivity to sulfonamides",

            "History of asthma, urticaria or allergic-type reactions after aspirin or other NSAIDs",

            "Use in the setting of coronary artery bypass graft surgery"

        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [

            "Renal impairment",

            "Dehydration",

            "Hypovolemia",

            "Hepatic impairment",

            "Hypertension",

            "Heart failure or edema",

            "NSAID hypersensitivity",

            "Aspirin-sensitive asthma",

            "Monitor for gastrointestinal bleeding",

            "Use the lowest effective dose for the shortest appropriate duration",

            "VYSCOXA must be administered on an empty stomach"

        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [

            "Abdominal pain",

            "Diarrhea",

            "Dyspepsia",

            "Flatulence",

            "Peripheral edema",

            "Dizziness",

            "Rash",

            "Gastrointestinal bleeding",

            "Renal impairment",

            "Hypersensitivity reactions"

        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "VYSCOXA oral suspension contains celecoxib 10 mg/mL. For pediatric juvenile rheumatoid arthritis, patients weighing 10–25 kg receive 50 mg (5 mL) twice daily; patients weighing more than 25 kg receive 100 mg (10 mL) twice daily. VYSCOXA must be administered on an empty stomach, at least 2 hours before or 1 hour after food. The current DoseCare calculator does not yet calculate weight-band regimens, so this medicine is intentionally not calculator-ready until that engine capability is implemented.",


        references: [

            {

                organization:
                    "U.S. National Library of Medicine",

                title:
                    "DailyMed - VYSCOXA (celecoxib) Oral Suspension",

                year:
                    2025,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5094d47f-e791-4190-9397-b7500143a74d"

            }

        ]

    }

];


/* =========================================
   ADD ANALGESICS TO DOSECARE DATABASE
========================================= */

analgesicMedicines.forEach(
    medicine => {

        if (
            !medicines.some(
                existingMedicine =>
                    existingMedicine.id ===
                    medicine.id
            )
        ) {

            medicines.push(
                medicine
            );

        }

    }
);
