/* =========================================
   DoseCare
   ANALGESICS / ANTIPYRETICS DATABASE

   Pediatric Oral-Liquid Medicines ONLY

   Supported dosage forms:
   - Oral solution
   - Oral suspension
   - Oral syrup

   IMPORTANT:
   - Do NOT add these medicines to medicine.js
   - This file registers medicines into the
     central DoseCare medicines array.
   - Clinical conditions are used when the
     dosing regimen is indication-specific.
========================================= */


const analgesicMedicines = [

    /* =========================================
       1. PARACETAMOL
       ACETAMINOPHEN
    ========================================= */

    {
        id: "paracetamol",

        genericName: "Paracetamol",

        name: "Paracetamol",

        brandNames: [
            "Panadol",
            "Calpol",
            "Tylenol"
        ],

        drugClass: [
            "Non-opioid analgesic",
            "Antipyretic"
        ],

        class:
            "Non-opioid Analgesic · Antipyretic",

        conditions: [
            "fever",
            "mild to moderate pain",
            "headache",
            "toothache",
            "musculoskeletal pain"
        ],

        route: "Oral",

        dosageForm: "Oral solution / Oral suspension",

        indications:
            "Symptomatic treatment of fever and mild to moderate pain in children.",

        moa:
            "Produces analgesic and antipyretic effects mainly through central mechanisms involving inhibition of prostaglandin synthesis. It has little clinically useful peripheral anti-inflammatory activity compared with NSAIDs.",

        pediatric:
            "Pediatric dosing should be based on body weight. The concentration of the selected oral-liquid formulation must be verified before converting the calculated dose from mg to mL.",

        formulations: [

            {
                form: "oral suspension",
                concentration: "120 mg/5 mL",
                mgPer5mL: 120
            },

            {
                form: "oral suspension",
                concentration: "125 mg/5 mL",
                mgPer5mL: 125
            },

            {
                form: "oral suspension",
                concentration: "160 mg/5 mL",
                mgPer5mL: 160
            }

        ],

        dosing: {

            type: "mg_per_kg_per_dose",

            minDose: 10,

            maxDose: 15,

            frequency: 4,

            frequencyText:
                "Every 4–6 hours as required",

            interval:
                "Every 4–6 hours as required",

            intervalHours: 4,

            maxDosesPer24Hours: 5,

            maxDailyDose: 60,

            unit: "mg/kg/dose",

            dailyUnit: "mg/kg/day",

            route: "oral",

            configured: true

        },

        indicationSpecific: false,

        contraindications: [
            "Known hypersensitivity to paracetamol or acetaminophen",
            "Severe hepatic impairment"
        ],

        precautions: [
            "Hepatic impairment",
            "Malnutrition",
            "Dehydration",
            "Concomitant use of other paracetamol or acetaminophen-containing medicines",
            "Verify formulation concentration before calculating volume",
            "Avoid exceeding the recommended total daily dose"
        ],

        adverseEffects: [
            "Nausea",
            "Vomiting",
            "Skin reactions",
            "Hepatotoxicity in overdose"
        ],

        notes:
            "Dose according to body weight. Always verify the formulation concentration before converting mg to mL. Do not administer more than one paracetamol/acetaminophen-containing medicine at the same time. DoseCare stores a general pediatric range of 10–15 mg/kg/dose.",

        references: [

            {
                organization: "DailyMed",

                title:
                    "Children's Acetaminophen Oral Suspension 160 mg/5 mL",

                year: 2025,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=38b839b6-de7d-4f33-a19a-efc92cdad2c"
            },

            {
                organization: "World Health Organization",

                title:
                    "WHO Model Formulary for Children",

                year: 2010,

                url:
                    "https://www.who.int/publications/i/item/9789241599320"
            }

        ]

    },


    /* =========================================
       2. IBUPROFEN
    ========================================= */

    {
        id: "ibuprofen",

        genericName: "Ibuprofen",

        name: "Ibuprofen",

        brandNames: [
            "Brufen",
            "Nurofen",
            "Advil"
        ],

        drugClass: [
            "NSAID",
            "Non-opioid analgesic",
            "Antipyretic",
            "Anti-inflammatory"
        ],

        class:
            "NSAID · Analgesic · Antipyretic · Anti-inflammatory",

        conditions: [
            "fever",
            "mild to moderate pain",
            "inflammation",
            "headache",
            "toothache",
            "juvenile idiopathic arthritis"
        ],

        route: "Oral",

        dosageForm: "Oral suspension",

        indications:
            "Symptomatic treatment of fever and mild to moderate pain, with anti-inflammatory treatment in selected pediatric conditions.",

        moa:
            "Reversibly inhibits cyclooxygenase enzymes COX-1 and COX-2, reducing prostaglandin synthesis and producing analgesic, antipyretic and anti-inflammatory effects.",

        pediatric:
            "Pediatric dosing depends on indication. Weight-based dosing is used for analgesia and fever reduction, while higher divided daily doses may be used for juvenile arthritis.",

        formulations: [

            {
                form: "oral suspension",
                concentration: "100 mg/5 mL",
                mgPer5mL: 100
            }

        ],

        dosing: {

            type: "condition_based",

            conditionBased: [

                {
                    condition: "fever",

                    type: "mg_per_kg_per_dose",

                    minDose: 5,

                    maxDose: 10,

                    frequency: 4,

                    frequencyText:
                        "Every 6–8 hours as required",

                    interval:
                        "Every 6–8 hours",

                    intervalHours: 6,

                    maxDailyDose: 40,

                    unit: "mg/kg/dose",

                    route: "oral",

                    minimumAgeMonths: 6,

                    configured: true
                },

                {
                    condition: "mild to moderate pain",

                    type: "mg_per_kg_per_dose",

                    minDose: 10,

                    maxDose: 10,

                    frequency: 4,

                    frequencyText:
                        "Every 6–8 hours as required",

                    interval:
                        "Every 6–8 hours",

                    intervalHours: 6,

                    maxDailyDose: 40,

                    unit: "mg/kg/dose",

                    route: "oral",

                    minimumAgeMonths: 6,

                    configured: true
                },

                {
                    condition: "juvenile idiopathic arthritis",

                    type: "mg_per_kg_per_day",

                    minDose: 20,

                    maxDose: 40,

                    frequency: 3,

                    alternativeFrequency: 4,

                    frequencyText:
                        "Divided into 3–4 doses daily",

                    maxDailyDose: 40,

                    unit: "mg/kg/day",

                    route: "oral",

                    configured: true
                }

            ],

            configured: true

        },

        indicationSpecific: true,

        contraindications: [
            "Known hypersensitivity to ibuprofen or other NSAIDs",
            "History of asthma, urticaria or allergic-type reactions after aspirin or other NSAIDs",
            "Active gastrointestinal bleeding",
            "Active peptic ulcer disease",
            "Severe renal impairment"
        ],

        precautions: [
            "Dehydration",
            "Renal impairment",
            "History of gastrointestinal ulceration or bleeding",
            "NSAID hypersensitivity",
            "Bleeding disorders",
            "Concomitant medicines that increase bleeding risk",
            "Use the lowest effective dose for the shortest appropriate duration"
        ],

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

        notes:
            "Do not use in children younger than 6 months unless specifically directed by an appropriate clinical source. Verify age, weight, hydration status, renal function and formulation concentration. Pediatric fever and analgesia regimens generally use 5–10 mg/kg/dose with a maximum of 40 mg/kg/day. Juvenile arthritis requires a different indication-specific regimen.",

        references: [

            {
                organization: "DailyMed",

                title:
                    "Ibuprofen Oral Suspension",

                year: 2024,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=84c2b3e4-366c-433e-8a5e-14d606c5201e"
            }

        ]

    },


    /* =========================================
       3. NAPROXEN
    ========================================= */

    {
        id: "naproxen",

        genericName: "Naproxen",

        name: "Naproxen",

        brandNames: [
            "Naprosyn"
        ],

        drugClass: [
            "NSAID",
            "Non-opioid analgesic",
            "Anti-inflammatory"
        ],

        class:
            "NSAID · Analgesic · Anti-inflammatory",

        conditions: [
            "polyarticular juvenile idiopathic arthritis"
        ],

        route: "Oral",

        dosageForm: "Oral suspension",

        indications:
            "Management of polyarticular juvenile idiopathic arthritis in children 2 years of age and older.",

        moa:
            "Inhibits cyclooxygenase enzymes and reduces prostaglandin synthesis, producing analgesic and anti-inflammatory effects.",

        pediatric:
            "Pediatric dosing for juvenile idiopathic arthritis is weight-based and divided into two daily doses.",

        formulations: [

            {
                form: "oral suspension",
                concentration: "125 mg/5 mL",
                mgPer5mL: 125
            }

        ],

        dosing: {

            type: "condition_based",

            conditionBased: [

                {
                    condition:
                        "polyarticular juvenile idiopathic arthritis",

                    type:
                        "mg_per_kg_per_day",

                    minDose: 10,

                    maxDose: 10,

                    frequency: 2,

                    frequencyText:
                        "Twice daily",

                    interval:
                        "Every 12 hours",

                    intervalHours: 12,

                    unit:
                        "mg/kg/day",

                    route:
                        "oral",

                    minimumAgeYears: 2,

                    configured: true
                }

            ],

            configured: true

        },

        indicationSpecific: true,

        contraindications: [
            "Known hypersensitivity to naproxen or any component of the product",
            "History of asthma, urticaria or allergic-type reactions after aspirin or other NSAIDs",
            "Use in the setting of coronary artery bypass graft surgery"
        ],

        precautions: [
            "Renal impairment",
            "Dehydration or hypovolemia",
            "History of gastrointestinal ulceration or bleeding",
            "Heart failure",
            "Hypertension",
            "Hepatic impairment",
            "NSAID hypersensitivity",
            "Use the lowest effective dose for the shortest appropriate duration"
        ],

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
            "For pediatric use in DoseCare, naproxen is configured only for polyarticular juvenile idiopathic arthritis in children 2 years and older. Recommended total daily dose is approximately 10 mg/kg/day divided into two doses.",

        references: [

            {
                organization: "DailyMed",

                title:
                    "Naproxen Oral Suspension",

                year: 2025,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=570974d4-0d5b-4df2-b307-37380511835d"
            }

        ]

    },


    /* =========================================
       4. MELOXICAM
    ========================================= */

    {
        id: "meloxicam",

        genericName: "Meloxicam",

        name: "Meloxicam",

        brandNames: [
            "Mobic",
            "Zybic"
        ],

        drugClass: [
            "NSAID",
            "Non-opioid analgesic",
            "Anti-inflammatory"
        ],

        class:
            "NSAID · Analgesic · Anti-inflammatory",

        conditions: [
            "juvenile rheumatoid arthritis",
            "juvenile idiopathic arthritis"
        ],

        route: "Oral",

        dosageForm: "Oral suspension",

        indications:
            "Relief of signs and symptoms of juvenile rheumatoid arthritis in patients 2 years of age and older.",

        moa:
            "Meloxicam inhibits cyclooxygenase-mediated prostaglandin synthesis, producing analgesic and anti-inflammatory effects.",

        pediatric:
            "Pediatric suspension dosing for juvenile rheumatoid arthritis is weight-based and administered once daily.",

        formulations: [

            {
                form: "oral suspension",
                concentration: "7.5 mg/5 mL",
                mgPer5mL: 7.5
            }

        ],

        dosing: {

            type: "condition_based",

            conditionBased: [

                {
                    condition:
                        "juvenile rheumatoid arthritis",

                    type:
                        "mg_per_kg_per_dose",

                    minDose: 0.125,

                    maxDose: 0.125,

                    frequency: 1,

                    frequencyText:
                        "Once daily",

                    interval:
                        "Every 24 hours",

                    intervalHours: 24,

                    maxDailyDose: 7.5,

                    unit:
                        "mg/kg/dose",

                    route:
                        "oral",

                    minimumAgeYears: 2,

                    configured: true
                }

            ],

            configured: true

        },

        indicationSpecific: true,

        contraindications: [
            "Known hypersensitivity to meloxicam or any component of the product",
            "History of asthma, urticaria or allergic-type reactions after aspirin or other NSAIDs",
            "Use in the setting of coronary artery bypass graft surgery"
        ],

        precautions: [
            "Renal impairment",
            "Dehydration",
            "Hypovolemia",
            "History of gastrointestinal ulceration or bleeding",
            "Heart failure",
            "Hypertension",
            "Hepatic impairment",
            "NSAID hypersensitivity"
        ],

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

        notes:
            "For juvenile rheumatoid arthritis, the pediatric dose is 0.125 mg/kg once daily up to a maximum of 7.5 mg/day. Meloxicam oral suspension is 7.5 mg/5 mL. The suspension is not automatically interchangeable with other meloxicam formulations on a mg-for-mg basis.",

        references: [

            {
                organization: "DailyMed",

                title:
                    "Meloxicam Oral Suspension",

                year: 2026,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=55af77dd-2abc-49a6-990c-399d5a5e7a91"
            }

        ]

    },


    /* =========================================
       5. MEFENAMIC ACID
    ========================================= */

    {
        id: "mefenamic-acid",

        genericName: "Mefenamic Acid",

        name: "Mefenamic Acid",

        brandNames: [
            "Mefenamic Acid Suspension"
        ],

        drugClass: [
            "NSAID",
            "Non-opioid analgesic",
            "Antipyretic",
            "Anti-inflammatory"
        ],

        class:
            "NSAID · Analgesic · Antipyretic · Anti-inflammatory",

        conditions: [
            "pain",
            "fever",
            "musculoskeletal pain",
            "dental pain",
            "headache",
            "traumatic pain",
            "juvenile inflammatory disease"
        ],

        route: "Oral",

        dosageForm: "Oral suspension",

        indications:
            "Symptomatic relief of pain and pyrexia in children and anti-inflammatory analgesic treatment in appropriate conditions.",

        moa:
            "Mefenamic acid inhibits prostaglandin activity, producing analgesic, antipyretic and anti-inflammatory effects.",

        pediatric:
            "The referenced pediatric suspension is intended for children over 6 months and under 12 years. The source provides both a weight-based daily reference and age-based dose volumes.",

        formulations: [

            {
                form: "oral suspension",
                concentration: "50 mg/5 mL",
                mgPer5mL: 50
            }

        ],

        dosing: {

            type: "condition_based",

            conditionBased: [

                {
                    condition:
                        "pain / fever",

                    type:
                        "mg_per_kg_per_day",

                    minDose: 25,

                    maxDose: 25,

                    frequency: 3,

                    frequencyText:
                        "Up to three times daily",

                    interval:
                        "Up to three times daily",

                    frequencyPerDay: 3,

                    unit:
                        "mg/kg/day",

                    route:
                        "oral",

                    minimumAgeMonths: 6,

                    maximumAgeYears: 12,

                    configured: true
                }

            ],

            configured: true

        },

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

        indicationSpecific: true,

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

        precautions: [
            "Dehydration",
            "Renal disease",
            "Hepatic impairment",
            "Cardiac impairment",
            "History of gastrointestinal disease",
            "Asthma",
            "Bleeding disorders",
            "Concomitant anticoagulants or antiplatelet medicines",
            "Concomitant use of other NSAIDs"
        ],

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

        notes:
            "The referenced product is a 50 mg/5 mL oral suspension. Pediatric use applies to children over 6 months and under 12 years. The source gives 25 mg/kg/day in divided doses and also provides age-based dose volumes. Doses may be repeated up to three times daily. Except for Still's disease, treatment should not continue longer than 7 days in children. Prefer administration with or after food.",

        references: [

            {
                organization:
                    "Electronic Medicines Compendium",

                title:
                    "Mefenamic Acid 50 mg/5 ml Suspension - Summary of Product Characteristics",

                year: 2025,

                url:
                    "https://www.medicines.org.uk/emc/product/13316/smpc"
            }

        ]

    },


    /* =========================================
       6. CELECOXIB
       VYSCOXA
    ========================================= */

    {
        id: "celecoxib",

        genericName: "Celecoxib",

        name: "Celecoxib",

        brandNames: [
            "VYSCOXA"
        ],

        drugClass: [
            "NSAID",
            "COX-2 selective inhibitor",
            "Anti-inflammatory",
            "Analgesic"
        ],

        class:
            "NSAID · COX-2 Selective Inhibitor · Analgesic · Anti-inflammatory",

        conditions: [
            "juvenile rheumatoid arthritis"
        ],

        route: "Oral",

        dosageForm: "Oral suspension",

        indications:
            "Management of the signs and symptoms of juvenile rheumatoid arthritis in pediatric patients 2 years of age and older.",

        moa:
            "Celecoxib selectively inhibits cyclooxygenase-2 (COX-2), reducing prostaglandin synthesis involved in pain and inflammation.",

        pediatric:
            "Pediatric dosing for VYSCOXA is weight-band based rather than a simple mg/kg regimen.",

        formulations: [

            {
                form: "oral suspension",
                concentration: "10 mg/mL",
                mgPerMl: 10,
                mgPer5mL: 50
            }

        ],

        dosing: {

            type: "condition_based",

            conditionBased: [

                {
                    condition:
                        "juvenile rheumatoid arthritis",

                    type:
                        "weight_band",

                    minimumAgeYears: 2,

                    weightBands: [

                        {
                            minWeightKg: 10,

                            maxWeightKg: 25,

                            doseMg: 50,

                            doseVolumeMl: 5,

                            frequency: 2,

                            intervalHours: 12
                        },

                        {
                            minWeightKg: 25.01,

                            doseMg: 100,

                            doseVolumeMl: 10,

                            frequency: 2,

                            intervalHours: 12
                        }

                    ],

                    route: "oral",

                    configured: false,

                    calculatorReady: false

                }

            ],

            configured: false,

            calculatorReady: false,

            reason:
                "Requires weight-band dosing support in the calculator engine."

        },

        indicationSpecific: true,

        contraindications: [
            "Known hypersensitivity to celecoxib",
            "History of asthma, urticaria or allergic-type reactions after aspirin or other NSAIDs",
            "Use in the setting of coronary artery bypass graft surgery"
        ],

        precautions: [
            "Renal impairment",
            "Dehydration",
            "Hypovolemia",
            "Hepatic impairment",
            "Hypertension",
            "Heart failure or edema",
            "NSAID hypersensitivity",
            "Aspirin-sensitive asthma",
            "Monitor for gastrointestinal bleeding"
        ],

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

        notes:
            "VYSCOXA is 10 mg/mL. For juvenile rheumatoid arthritis: patients weighing 10–25 kg receive 50 mg (5 mL) twice daily; patients weighing more than 25 kg receive 100 mg (10 mL) twice daily. VYSCOXA must be administered on an empty stomach, at least 2 hours before or 1 hour after food. DoseCare does not currently calculate this medicine until weight-band support is implemented.",

        references: [

            {
                organization: "DailyMed",

                title:
                    "VYSCOXA (celecoxib) Oral Suspension",

                year: 2025,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5094d47e-f791-4190-9397-b7500143a74d"
            }

        ]

    },


    /* =========================================
       7. MORPHINE SULFATE
    ========================================= */

    {
        id: "morphine-sulfate",

        genericName: "Morphine Sulfate",

        name: "Morphine Sulfate",

        brandNames: [],

        drugClass: [
            "Opioid analgesic",
            "Strong analgesic"
        ],

        class:
            "Opioid Analgesic · Strong Analgesic",

        conditions: [
            "severe pain",
            "acute severe pain"
        ],

        route: "Oral",

        dosageForm: "Oral solution",

        indications:
            "Relief of severe pain when opioid analgesia is clinically appropriate.",

        moa:
            "Morphine is a mu-opioid receptor agonist that alters the perception and response to pain and produces analgesic effects through central nervous system mechanisms.",

        pediatric:
            "Pediatric morphine dosing is individualized according to body weight, pain severity, clinical response and previous opioid exposure.",

        formulations: [

            {
                form: "oral solution",
                concentration: "2 mg/mL",
                mgPerMl: 2,
                mgPer5mL: 10
            },

            {
                form: "oral solution",
                concentration: "4 mg/mL",
                mgPerMl: 4,
                mgPer5mL: 20
            }

        ],

        dosing: {

            type: "mg_per_kg_per_dose",

            minDose: 0.15,

            maxDose: 0.3,

            frequency: 6,

            frequencyText:
                "Every 4 hours as needed",

            interval:
                "Every 4 hours as needed",

            intervalHours: 4,

            unit:
                "mg/kg/dose",

            route:
                "oral",

            minimumAgeYears: 2,

            maxInitialDoseMg: 20,

            configured: true

        },

        indicationSpecific: false,

        contraindications: [
            "Significant respiratory depression",
            "Acute or severe bronchial asthma in an unmonitored setting or without resuscitative equipment",
            "Known or suspected gastrointestinal obstruction including paralytic ileus",
            "Hypersensitivity to morphine or other opioid components",
            "Concurrent MAOI use or use within the previous 14 days"
        ],

        precautions: [
            "Respiratory depression",
            "Sedation",
            "Opioid-naive patients",
            "Renal impairment",
            "Hepatic impairment",
            "Hypotension",
            "Head injury or increased intracranial pressure",
            "Seizure disorders",
            "Risk of misuse, abuse and addiction",
            "Physical dependence and withdrawal",
            "Concomitant CNS depressants"
        ],

        adverseEffects: [
            "Respiratory depression",
            "Sedation",
            "Somnolence",
            "Nausea",
            "Vomiting",
            "Constipation",
            "Pruritus",
            "Hypotension",
            "Dizziness",
            "Urinary retention"
        ],

        notes:
            "For pediatric patients 2 years of age and older, initiate with 0.15–0.3 mg/kg every 4 hours as needed for pain. Do not exceed 20 mg as an initial pediatric dose. Only the 2 mg/mL and 4 mg/mL oral-solution concentrations should be used in pediatric patients according to the referenced prescribing information. Morphine requires specialist clinical judgment and monitoring.",

        references: [

            {
                organization: "DailyMed",

                title:
                    "Morphine Sulfate Oral Solution",

                year: 2026,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bb6b3439-9f0c-45f5-bf6f-c7a971af0a8f"
            }

        ]

    },


    /* =========================================
       8. TRAMADOL
    ========================================= */

    {
        id: "tramadol",

        genericName: "Tramadol",

        name: "Tramadol",

        brandNames: [],

        drugClass: [
            "Opioid analgesic",
            "Centrally acting analgesic"
        ],

        class:
            "Opioid Analgesic · Centrally Acting Analgesic",

        conditions: [
            "moderate to severe pain"
        ],

        route: "Oral",

        dosageForm: "Oral solution",

        indications:
            "Treatment of moderate to severe pain in appropriately selected patients. Pediatric use is restricted by age and clinical risk.",

        moa:
            "Tramadol is a centrally acting analgesic with opioid activity at mu receptors and additional effects on norepinephrine and serotonin reuptake.",

        pediatric:
            "Tramadol oral solution is contraindicated in children younger than 12 years. It is not configured as a routine pediatric weight-based calculator regimen in DoseCare.",

        formulations: [

            {
                form: "oral solution",
                concentration: "5 mg/mL",
                mgPerMl: 5,
                mgPer5mL: 25
            }

        ],

        dosing: {

            type: "fixed_dose",

            configured: false,

            calculatorReady: false,

            minimumAgeYears: 12,

            frequencyText:
                "50–100 mg every 4–6 hours",

            maxDailyDoseMg: 400,

            route: "oral",

            note:
                "Fixed-dose adolescent regimen. Not currently supported by the DoseCare calculator engine."

        },

        indicationSpecific: false,

        contraindications: [
            "Children younger than 12 years",
            "Patients younger than 18 years following tonsillectomy and/or adenoidectomy",
            "Significant respiratory depression",
            "Acute or severe bronchial asthma in an unmonitored setting",
            "Known or suspected gastrointestinal obstruction",
            "Concurrent MAOI use or MAOI use within the previous 14 days",
            "Hypersensitivity to tramadol or opioids"
        ],

        precautions: [
            "Respiratory depression",
            "Risk of seizures",
            "CYP2D6 metabolic variability",
            "CYP3A4 drug interactions",
            "Serotonergic drug interactions",
            "Sedation",
            "Risk of dependence and withdrawal",
            "Use under appropriate medical supervision"
        ],

        adverseEffects: [
            "Nausea",
            "Vomiting",
            "Dizziness",
            "Somnolence",
            "Constipation",
            "Respiratory depression",
            "Seizures",
            "Serotonin syndrome",
            "Dependence",
            "Withdrawal symptoms"
        ],

        notes:
            "Tramadol oral solution is contraindicated in children under 12 years. It is also contraindicated for postoperative management in patients under 18 years following tonsillectomy and/or adenoidectomy. DoseCare intentionally does not calculate this fixed-dose opioid regimen until a dedicated fixed-dose engine is available.",

        references: [

            {
                organization: "DailyMed",

                title:
                    "Tramadol Hydrochloride Oral Solution",

                year: 2024,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2804c640-9d47-4b40-b58b-da321b79cf39"
            }

        ]

    },


    /* =========================================
       9. OXYCODONE
    ========================================= */

    {
        id: "oxycodone",

        genericName: "Oxycodone Hydrochloride",

        name: "Oxycodone",

        brandNames: [],

        drugClass: [
            "Opioid analgesic",
            "Strong analgesic"
        ],

        class:
            "Opioid Analgesic · Strong Analgesic",

        conditions: [
            "severe pain"
        ],

        route: "Oral",

        dosageForm: "Oral solution",

        indications:
            "Treatment of severe pain that can be adequately managed with opioid analgesics in appropriately selected adolescents.",

        moa:
            "Oxycodone is an opioid agonist that acts primarily at mu-opioid receptors in the central nervous system to produce analgesia.",

        pediatric:
            "Oxycodone oral solution may be used in adolescents 12 years of age and older under specialist supervision. It is not recommended in children younger than 12 years.",

        formulations: [

            {
                form: "oral solution",
                concentration: "1 mg/mL",
                mgPerMl: 1,
                mgPer5mL: 5
            },

            {
                form: "oral solution",
                concentration: "10 mg/mL",
                mgPerMl: 10,
                mgPer5mL: 50
            }

        ],

        dosing: {

            type: "fixed_dose",

            configured: false,

            calculatorReady: false,

            minimumAgeYears: 12,

            initialDoseMg: 5,

            frequencyText:
                "Every 6 hours initially",

            alternativeInterval:
                "Every 4 hours if clinically required",

            maximumDosesPerDay: 6,

            route: "oral",

            note:
                "Fixed-dose adolescent opioid regimen requiring specialist prescribing and individual titration. Not currently supported by the DoseCare calculator engine."

        },

        indicationSpecific: false,

        contraindications: [
            "Children younger than 12 years",
            "Significant respiratory depression",
            "Acute or severe bronchial asthma in an unmonitored setting",
            "Known or suspected gastrointestinal obstruction",
            "Hypersensitivity to oxycodone or other opioid components",
            "Concurrent MAOI use or recent MAOI use"
        ],

        precautions: [
            "Respiratory depression",
            "Sedation",
            "Opioid-naive patients",
            "Renal impairment",
            "Hepatic impairment",
            "Low body weight",
            "Risk of dependence and misuse",
            "Physical dependence and withdrawal",
            "Concomitant CNS depressants",
            "Use only under specialist supervision"
        ],

        adverseEffects: [
            "Nausea",
            "Vomiting",
            "Constipation",
            "Somnolence",
            "Dizziness",
            "Respiratory depression",
            "Pruritus",
            "Hypotension",
            "Urinary retention",
            "Dependence"
        ],

        notes:
            "Oxycodone oral solution is not recommended below 12 years of age. For adolescents 12 years and older, the referenced product information gives an initial dose of 5 mg every 6 hours, with the interval potentially reduced to every 4 hours if necessary. The current DoseCare calculator intentionally does not calculate this fixed-dose opioid regimen.",

        references: [

            {
                organization:
                    "Electronic Medicines Compendium",

                title:
                    "Oxycodone Hydrochloride 1 mg/mL and 10 mg/mL Oral Solution - Summary of Product Characteristics",

                year: 2025,

                url:
                    "https://www.medicines.org.uk/emc/product/13371/smpc"
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
                    existingMedicine.id === medicine.id
            )
        ) {

            medicines.push(medicine);

        }

    }
);


/* =========================================
   END OF ANALGESICS DATABASE
========================================= */
