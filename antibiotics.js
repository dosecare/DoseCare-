/* =========================================
   DoseCare
   ANTIBIOTICS DATABASE
   Pediatric Oral Liquid Medicines Only

   UNIFIED MEDICINE SCHEMA
   -----------------------------------------
   - Oral liquids ONLY
   - Unified medicine structure
   - Unified formulations structure
   - Structured dosing regimens
   - No clinical-condition selection
   - calculatorReady controls whether the
     current dosing model is safe to calculate
========================================= */


/*
    IMPORTANT
    -----------------------------------------
    This database contains pediatric oral
    liquid antibiotics only.

    Allowed dosage forms:
    - Oral suspension
    - Oral solution

    NOT INCLUDED:
    - Tablets
    - Capsules
    - Chewable tablets
    - IV injections
    - IM injections
    - Suppositories

    IMPORTANT CLINICAL RULE
    -----------------------------------------
    Not every medicine is automatically
    calculator-ready.

    If the recommended pediatric dose depends
    materially on indication, severity, or
    another clinical selection that DoseCare
    does not currently collect, the medicine
    remains in the database but:

        calculatorReady: false

    This prevents the calculator from presenting
    an indication-specific dose as a universal
    pediatric dose.
========================================= */


medicines.push(


/* =========================================
   1. AMOXICILLIN
========================================= */

{
    id: "amoxicillin",

    genericName: "Amoxicillin",

    brandNames: [
        "Amoxil"
    ],

    drugClass: [
        "Penicillin",
        "Beta-lactam",
        "Antibiotic"
    ],

    route: "oral",

    dosageForms: [
        "oral suspension"
    ],

    formulations: [

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 125,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "125 mg/5 mL"
        },

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 200,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "200 mg/5 mL"
        },

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 250,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "250 mg/5 mL"
        },

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 400,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "400 mg/5 mL"
        }

    ],

    indications: [
        "Susceptible bacterial infections",
        "Selected respiratory tract infections",
        "Selected ear infections",
        "Selected skin and skin-structure infections",
        "Selected genitourinary infections"
    ],

    conditions: [
        "acute otitis media",
        "community acquired pneumonia",
        "streptococcal pharyngitis",
        "acute bacterial sinusitis",
        "susceptible bacterial infections"
    ],

    moa:
        "Binds to penicillin-binding proteins and inhibits bacterial cell-wall synthesis, leading to bacterial cell lysis.",

    pediatric: {

        age: {
            minimumMonths: 3
        },

        weight: {
            maximumKg: 40
        }

    },

    dosing: {

        calculatorReady: true,

        regimens: [

            {
                id: "amoxicillin-general-moderate",

                type: "mg_per_kg_per_day",

                minDose: 25,
                maxDose: 25,

                frequency: 2,

                doseUnit: "mg/kg/day",

                age: {
                    minimumMonths: 3
                },

                weight: {
                    maximumKg: 40
                },

                duration:
                    "Usually indication dependent",

                clinicalContext:
                    "General mild-to-moderate regimen",

                referenceIds: [
                    "dailymed-amoxicillin"
                ]
            },

            {
                id: "amoxicillin-general-severe",

                type: "mg_per_kg_per_day",

                minDose: 45,
                maxDose: 45,

                frequency: 2,

                doseUnit: "mg/kg/day",

                age: {
                    minimumMonths: 3
                },

                weight: {
                    maximumKg: 40
                },

                duration:
                    "Usually indication dependent",

                clinicalContext:
                    "Severe or lower respiratory tract regimen",

                referenceIds: [
                    "dailymed-amoxicillin"
                ]
            }

        ]

    },

    calculatorReady: true,

    notes:
        "Amoxicillin pediatric dosing varies by infection and severity. The calculator-ready regimens represent labeled pediatric regimens for patients older than 3 months and weighing less than 40 kg. Children weighing 40 kg or more are generally dosed according to adult recommendations. Verify indication, allergy history, renal function when clinically appropriate, body weight, and formulation concentration. Oral suspension should be shaken well before use.",

    references: [

        {
            id: "dailymed-amoxicillin",

            organization: "DailyMed",

            title:
                "Amoxicillin for Oral Suspension",

            year: 2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ec7dd735-dc92-3d29-e053-2a95a90af549"
        }

    ]

},


/* =========================================
   2. AMOXICILLIN + CLAVULANATE
========================================= */

{
    id: "amoxicillin-clavulanate",

    genericName:
        "Amoxicillin + Clavulanate",

    brandNames: [
        "Augmentin"
    ],

    drugClass: [
        "Penicillin",
        "Beta-lactam",
        "Beta-lactamase inhibitor",
        "Antibiotic"
    ],

    route: "oral",

    dosageForms: [
        "oral suspension"
    ],

    formulations: [

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 600,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            secondaryComponent: {
                name: "Clavulanate",
                amount: 42.9,
                unit: "mg"
            },

            display:
                "600 mg/42.9 mg per 5 mL",

            doseComponent:
                "amoxicillin"
        }

    ],

    indications: [
        "Selected susceptible bacterial infections",
        "Acute otitis media",
        "Acute bacterial sinusitis",
        "Selected respiratory tract infections",
        "Selected skin and soft tissue infections"
    ],

    conditions: [
        "acute otitis media",
        "sinusitis",
        "respiratory tract infections",
        "skin and soft tissue infections",
        "susceptible beta-lactamase producing infections"
    ],

    moa:
        "Amoxicillin inhibits bacterial cell-wall synthesis. Clavulanate inhibits susceptible bacterial beta-lactamases and protects amoxicillin from enzymatic degradation.",

    pediatric: {

        age: {
            minimumMonths: 3,
            maximumYears: 12
        },

        weight: {
            maximumKg: 40
        }

    },

    dosing: {

        calculatorReady: true,

        regimens: [

            {
                id:
                    "amoxicillin-clavulanate-high-dose-600",

                type:
                    "mg_per_kg_per_day",

                minDose: 90,
                maxDose: 90,

                frequency: 2,

                doseUnit: "mg/kg/day",

                doseComponent:
                    "amoxicillin",

                age: {
                    minimumMonths: 3,
                    maximumYears: 12
                },

                weight: {
                    maximumKg: 40
                },

                duration:
                    "10 days",

                clinicalContext:
                    "Regimen associated with the 600 mg/42.9 mg per 5 mL formulation",

                referenceIds: [
                    "dailymed-amoxicillin-clavulanate-600"
                ]
            }

        ]

    },

    calculatorReady: true,

    notes:
        "Dose is calculated using the amoxicillin component. For the 600 mg/42.9 mg per 5 mL formulation, the labeled pediatric dose is 90 mg/kg/day divided every 12 hours for 10 days in patients aged 3 months to 12 years weighing 40 kg or less. Different amoxicillin/clavulanate suspension concentrations are not interchangeable on a mg-for-mg basis. Administer at the start of a meal. Verify the exact formulation before calculating.",

    references: [

        {
            id:
                "dailymed-amoxicillin-clavulanate-600",

            organization: "DailyMed",

            title:
                "Amoxicillin and Clavulanate Potassium for Oral Suspension 600 mg/42.9 mg per 5 mL",

            year: 2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=6339bcdb-060f-4558-9f42-6bf7f935e138"
        }

    ]

},


/* =========================================
   3. AZITHROMYCIN
========================================= */

{
    id: "azithromycin",

    genericName: "Azithromycin",

    brandNames: [
        "Zithromax",
        "Sumamed"
    ],

    drugClass: [
        "Macrolide",
        "Antibiotic"
    ],

    route: "oral",

    dosageForms: [
        "oral suspension"
    ],

    formulations: [

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 100,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "100 mg/5 mL"
        },

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 200,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "200 mg/5 mL"
        }

    ],

    indications: [
        "Acute otitis media",
        "Acute bacterial sinusitis",
        "Community-acquired pneumonia",
        "Pharyngitis",
        "Tonsillitis"
    ],

    conditions: [
        "acute otitis media",
        "community acquired pneumonia",
        "acute bacterial sinusitis",
        "pharyngitis",
        "tonsillitis"
    ],

    moa:
        "Binds to the 50S bacterial ribosomal subunit and inhibits bacterial protein synthesis.",

    pediatric: {

        age: {
            minimumMonths: 6
        }

    },

    dosing: {

        calculatorReady: false,

        regimens: [

            {
                id:
                    "azithromycin-otitis-media",

                type:
                    "condition_based",

                condition:
                    "acute otitis media",

                note:
                    "Indication-specific regimen"
            },

            {
                id:
                    "azithromycin-sinusitis",

                type:
                    "condition_based",

                condition:
                    "acute bacterial sinusitis",

                note:
                    "Indication-specific regimen"
            },

            {
                id:
                    "azithromycin-pneumonia",

                type:
                    "condition_based",

                condition:
                    "community acquired pneumonia",

                note:
                    "Indication-specific regimen"
            },

            {
                id:
                    "azithromycin-pharyngitis",

                type:
                    "condition_based",

                condition:
                    "pharyngitis",

                note:
                    "Indication-specific regimen"
            }

        ]

    },

    calculatorReady: false,

    calculatorStatus: {

        ready: false,

        reason:
            "Pediatric azithromycin dosing varies by indication and regimen. The current DoseCare calculator does not collect indication selection."
    },

    notes:
        "Azithromycin has multiple labeled pediatric regimens that vary by indication, including single-dose and multi-day regimens. Because the current DoseCare model does not ask the user to select the clinical indication, this medicine is retained in the database but is not calculator-ready. This prevents an indication-specific regimen from being presented as a universal pediatric dose. Consider QT prolongation and clinically important drug interactions.",

    references: [

        {
            id:
                "dailymed-azithromycin",

            organization: "DailyMed",

            title:
                "Azithromycin for Oral Suspension",

            year: 2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=714f6f55-278a-4fcf-8d4e-2ad9b43623a3"
        }

    ]

},


/* =========================================
   4. CEFALEXIN
========================================= */

{
    id: "cefalexin",

    genericName: "Cefalexin",

    brandNames: [
        "Keflex"
    ],

    drugClass: [
        "Cephalosporin",
        "Beta-lactam",
        "Antibiotic"
    ],

    route: "oral",

    dosageForms: [
        "oral suspension"
    ],

    formulations: [

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 125,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "125 mg/5 mL"
        },

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 250,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "250 mg/5 mL"
        }

    ],

    indications: [
        "Susceptible respiratory tract infections",
        "Otitis media",
        "Skin and skin-structure infections",
        "Bone infections",
        "Genitourinary infections"
    ],

    conditions: [
        "acute otitis media",
        "streptococcal pharyngitis",
        "skin and soft tissue infections",
        "urinary tract infections",
        "susceptible bacterial infections"
    ],

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    pediatric: {

        age: {
            minimumMonths: 12,
            minimumRelation: ">"
        }

    },

    dosing: {

        calculatorReady: true,

        regimens: [

            {
                id:
                    "cefalexin-general-pediatric",

                type:
                    "mg_per_kg_per_day",

                minDose: 25,
                maxDose: 50,

                frequency: 4,

                doseUnit: "mg/kg/day",

                age: {
                    minimumMonths: 12,
                    minimumRelation: ">"
                },

                duration:
                    "7-14 days",

                clinicalContext:
                    "General pediatric regimen",

                referenceIds: [
                    "dailymed-cefalexin"
                ]
            }

        ]

    },

    calculatorReady: true,

    notes:
        "The labeled general pediatric dose for patients over 1 year of age is 25 to 50 mg/kg/day in equally divided doses for 7 to 14 days. Severe infections and otitis media may require higher daily doses and therefore require clinical context beyond the current general calculator regimen. Verify indication, weight, allergy history and renal function when clinically appropriate.",

    references: [

        {
            id:
                "dailymed-cefalexin",

            organization: "DailyMed",

            title:
                "Cephalexin for Oral Suspension",

            year: 2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=25ef498a-7a7e-4543-a544-b9d0e99f9cd9"
        }

    ]

},


/* =========================================
   5. CEFUROXIME
========================================= */

{
    id: "cefuroxime",

    genericName: "Cefuroxime",

    brandNames: [
        "Ceftin",
        "Zinnat"
    ],

    drugClass: [
        "Cephalosporin",
        "Beta-lactam",
        "Antibiotic"
    ],

    route: "oral",

    dosageForms: [
        "oral suspension"
    ],

    formulations: [

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 125,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "125 mg/5 mL"
        },

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 250,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "250 mg/5 mL"
        }

    ],

    indications: [
        "Pharyngitis",
        "Tonsillitis",
        "Acute otitis media",
        "Acute bacterial maxillary sinusitis",
        "Impetigo"
    ],

    conditions: [
        "pharyngitis",
        "tonsillitis",
        "acute otitis media",
        "acute bacterial sinusitis",
        "impetigo"
    ],

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    pediatric: {

        age: {
            minimumMonths: 3,
            maximumYears: 12
        }

    },

    dosing: {

        calculatorReady: true,

        regimens: [

            {
                id:
                    "cefuroxime-pharyngitis-tonsillitis",

                type:
                    "mg_per_kg_per_day",

                minDose: 20,
                maxDose: 20,

                frequency: 2,

                doseUnit: "mg/kg/day",

                maxDailyDose: 500,

                age: {
                    minimumMonths: 3,
                    maximumYears: 12
                },

                duration:
                    "10 days",

                clinicalContext:
                    "Pharyngitis / tonsillitis",

                referenceIds: [
                    "dailymed-cefuroxime"
                ]
            },

            {
                id:
                    "cefuroxime-other-labeled-infections",

                type:
                    "mg_per_kg_per_day",

                minDose: 30,
                maxDose: 30,

                frequency: 2,

                doseUnit: "mg/kg/day",

                maxDailyDose: 1000,

                age: {
                    minimumMonths: 3,
                    maximumYears: 12
                },

                duration:
                    "10 days",

                clinicalContext:
                    "Acute otitis media, acute bacterial maxillary sinusitis, or impetigo",

                referenceIds: [
                    "dailymed-cefuroxime"
                ]
            }

        ]

    },

    calculatorReady: false,

    calculatorStatus: {

        ready: false,

        reason:
            "Cefuroxime pediatric dosing varies by indication. The database preserves the labeled regimens, but the current DoseCare calculator does not collect indication selection."
    },

    notes:
        "Cefuroxime axetil oral suspension is indicated for pediatric patients 3 months to 12 years for specific infections. The labeled dose is 20 mg/kg/day divided twice daily for pharyngitis/tonsillitis and 30 mg/kg/day divided twice daily for acute otitis media, acute bacterial maxillary sinusitis, and impetigo. The oral suspension and tablets are not bioequivalent and are not substitutable on a milligram-for-milligram basis. Administer the suspension with food and shake well before each use.",

    references: [

        {
            id:
                "dailymed-cefuroxime",

            organization: "DailyMed",

            title:
                "Cefuroxime Axetil for Oral Suspension",

            year: 2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=135e2dfc-eb47-4d04-a903-a081d36c267e"
        }

    ]

},


/* =========================================
   6. CEFIXIME
========================================= */

{
    id: "cefixime",

    genericName: "Cefixime",

    brandNames: [
        "Suprax"
    ],

    drugClass: [
        "Cephalosporin",
        "Beta-lactam",
        "Antibiotic"
    ],

    route: "oral",

    dosageForms: [
        "oral suspension"
    ],

    formulations: [

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 100,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "100 mg/5 mL"
        },

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 200,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "200 mg/5 mL"
        },

        {
            dosageForm: "oral suspension",

            concentration: {
                amount: 500,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "500 mg/5 mL"
        }

    ],

    indications: [
        "Acute otitis media",
        "Pharyngitis",
        "Tonsillitis",
        "Uncomplicated urinary tract infections",
        "Selected susceptible bacterial infections"
    ],

    conditions: [
        "acute otitis media",
        "pharyngitis",
        "tonsillitis",
        "uncomplicated urinary tract infections",
        "susceptible bacterial infections"
    ],

    moa:
        "Inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.",

    pediatric: {

        age: {
            minimumMonths: 6
        },

        weight: {
            maximumKg: 45
        },

        ageWeightNote:
            "Patients older than 12 years or weighing more than 45 kg should generally receive the recommended adult dose."
    },

    dosing: {

        calculatorReady: true,

        regimens: [

            {
                id:
                    "cefixime-once-daily",

                type:
                    "mg_per_kg_per_day",

                minDose: 8,
                maxDose: 8,

                frequency: 1,

                doseUnit: "mg/kg/day",

                maxDailyDose: 400,

                age: {
                    minimumMonths: 6
                },

                weight: {
                    maximumKg: 45
                },

                duration:
                    "Usually indication dependent",

                referenceIds: [
                    "dailymed-cefixime"
                ]
            },

            {
                id:
                    "cefixime-every-12-hours",

                type:
                    "mg_per_kg_per_dose",

                minDose: 4,
                maxDose: 4,

                frequency: 2,

                doseUnit: "mg/kg/dose",

                maxDailyDose: 400,

                age: {
                    minimumMonths: 6
                },

                weight: {
                    maximumKg: 45
                },

                duration:
                    "Usually indication dependent",

                referenceIds: [
                    "dailymed-cefixime"
                ]
            }

        ]

    },

    calculatorReady: true,

    notes:
        "The recommended pediatric dose is 8 mg/kg/day and may be administered once daily or as 4 mg/kg every 12 hours. The maximum recommended daily dose is 400 mg. Pediatric patients 6 months and older are included in the labeled regimen. Patients weighing more than 45 kg or older than 12 years should generally receive the recommended adult dose. Verify the formulation concentration before converting mg to mL.",

    references: [

        {
            id:
                "dailymed-cefixime",

            organization: "DailyMed",

            title:
                "Cefixime for Oral Suspension",

            year: 2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=068e6edd-a5fe-40d8-8dcf-ac82b78dced4"
        }

    ]

},


/* =========================================
   7. CLINDAMYCIN
========================================= */

{
    id: "clindamycin",

    genericName: "Clindamycin",

    brandNames: [
        "Cleocin",
        "Dalacin"
    ],

    drugClass: [
        "Lincosamide",
        "Antibiotic"
    ],

    route: "oral",

    dosageForms: [
        "oral solution"
    ],

    formulations: [

        {
            dosageForm: "oral solution",

            concentration: {
                amount: 75,
                unit: "mg",
                volume: 5,
                volumeUnit: "mL"
            },

            display: "75 mg/5 mL"
        }

    ],

    indications: [
        "Serious susceptible bacterial infections",
        "Selected skin and soft tissue infections",
        "Selected streptococcal infections",
        "Selected staphylococcal infections",
        "Selected anaerobic infections"
    ],

    conditions: [
        "serious bacterial infections",
        "skin and soft tissue infections",
        "anaerobic infections",
        "streptococcal infections",
        "staphylococcal infections"
    ],

    moa:
        "Binds to the 50S ribosomal subunit and inhibits bacterial protein synthesis.",

    pediatric: {

        age: {
            minimumMonths: 0
        }

    },

    dosing: {

        calculatorReady: false,

        regimens: [

            {
                id:
                    "clindamycin-serious-infection",

                type:
                    "mg_per_kg_per_day",

                minDose: 8,
                maxDose: 12,

                frequencyOptions: [
                    3,
                    4
                ],

                doseUnit: "mg/kg/day",

                clinicalContext:
                    "Serious infections",

                referenceIds: [
                    "dailymed-clindamycin"
                ]
            },

            {
                id:
                    "clindamycin-severe-infection",

                type:
                    "mg_per_kg_per_day",

                minDose: 13,
                maxDose: 16,

                frequencyOptions: [
                    3,
                    4
                ],

                doseUnit: "mg/kg/day",

                clinicalContext:
                    "Severe infections",

                referenceIds: [
                    "dailymed-clindamycin"
                ]
            },

            {
                id:
                    "clindamycin-more-severe-infection",

                type:
                    "mg_per_kg_per_day",

                minDose: 17,
                maxDose: 25,

                frequencyOptions: [
                    3,
                    4
                ],

                doseUnit: "mg/kg/day",

                clinicalContext:
                    "More severe infections",

                referenceIds: [
                    "dailymed-clindamycin"
                ]
            }

        ]

    },

    calculatorReady: false,

    calculatorStatus: {

        ready: false,

        reason:
            "Pediatric clindamycin dosing is severity-dependent. The current DoseCare calculator does not collect infection severity."
    },

    notes:
        "Labeled pediatric dosing varies by infection severity: 8-12 mg/kg/day for serious infections, 13-16 mg/kg/day for severe infections, and 17-25 mg/kg/day for more severe infections, divided into 3 or 4 equal doses. Because the current DoseCare calculator does not collect severity, clindamycin is retained as database information but is not calculator-ready. Clindamycin carries an important risk of C. difficile-associated diarrhea; significant diarrhea requires medical assessment.",

    references: [

        {
            id:
                "dailymed-clindamycin",

            organization: "DailyMed",

            title:
                "Clindamycin Palmitate Hydrochloride for Oral Solution",

            year: 2026,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=faf67eb8-1fd7-4b2c-a55b-24ba664c0dce"
        }

    ]

}

);


/* =========================================
   END OF ANTIBIOTICS DATABASE
========================================= */
