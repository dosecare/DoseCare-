/* =========================================================
   DoseCare
   RESPIRATORY SYSTEM DATABASE

   Pediatric Oral Liquid Medicines ONLY

   UNIFIED DATABASE STRUCTURE
   ---------------------------------------------------------
   Medicine
      ↓
   Condition
      ↓
   Regimen
      ↓
   Dose
      ↓
   Frequency
      ↓
   Formulation / Concentration

   IMPORTANT
   ---------------------------------------------------------
   ONLY:
   - Syrup
   - Oral solution
   - Oral suspension
   - Oral liquid

   NOT INCLUDED:
   - Tablets
   - Capsules
   - Chewables
   - Granules
   - Inhalers
   - Nebulizer solutions
   - IV / IM
   - Suppositories

   The current calculator will be updated later to
   understand all dosing types stored here.
========================================================= */


/* =========================================================
   RESPIRATORY MEDICINES
========================================================= */

const respiratoryMedicines = [

    /* =====================================================
       1. DEXTROMETHORPHAN
       DRY COUGH
    ===================================================== */

    {
        id: "dextromethorphan",

        genericName:
            "Dextromethorphan Hydrobromide",

        name:
            "Dextromethorphan",

        brandNames: [],

        drugClass: [
            "Antitussive",
            "Cough suppressant"
        ],

        class:
            "Antitussive · Cough Suppressant",

        route:
            "oral",

        dosageForms: [
            "oral solution",
            "oral liquid"
        ],

        formulations: [
            {
                dosageForm: "oral solution",

                concentration: {
                    amount: 15,
                    unit: "mg",
                    volume: 5,
                    volumeUnit: "mL"
                },

                display:
                    "15 mg/5 mL"
            }
        ],

        coughType: [
            "dry"
        ],

        coughCategory:
            "Dry Cough",

        therapeuticRole:
            "Antitussive",

        conditions: [
            "dry cough",
            "acute cough",
            "minor throat irritation",
            "minor bronchial irritation"
        ],

        indications:
            "Temporary relief of cough due to minor throat and bronchial irritation.",

        moa:
            "Centrally acting antitussive that suppresses the cough reflex.",

        pediatric: {
            minimumAgeYears: 6
        },

        dosing: {

            calculatorReady: true,

            regimens: [

                {
                    id:
                        "dextromethorphan-dry-cough-6-11",

                    condition:
                        "dry cough",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 6,
                    maximumAgeYears: 11,

                    dose: 15,

                    doseUnit: "mg/dose",

                    volume: 5,

                    volumeUnit: "mL",

                    frequency:
                        4,

                    frequencyText:
                        "Every 6–8 hours as needed",

                    maximumDosesPer24Hours:
                        4
                },

                {
                    id:
                        "dextromethorphan-dry-cough-12-plus",

                    condition:
                        "dry cough",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 12,

                    dose: 30,

                    doseUnit: "mg/dose",

                    volume: 10,

                    volumeUnit: "mL",

                    frequency:
                        4,

                    frequencyText:
                        "Every 6–8 hours as needed",

                    maximumDosesPer24Hours:
                        4
                }

            ]

        },

        calculatorReady:
            true,

        notes:
            "The referenced 15 mg/5 mL oral-liquid product is labeled for children 6 years and older. Do not use for persistent or chronic cough without evaluation. Avoid use with MAO inhibitors and observe relevant serotonergic drug-interaction precautions.",

        references: [

            {
                id:
                    "dailymed-dextromethorphan",

                organization:
                    "DailyMed",

                title:
                    "Dextromethorphan Hydrobromide Liquid",

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=13ae4c67-a3fe-440c-91b8-c9412626c3cd"
            }

        ]
    },


    /* =====================================================
       2. GUAIFENESIN
       WET / PRODUCTIVE COUGH
    ===================================================== */

    {
        id:
            "guaifenesin",

        genericName:
            "Guaifenesin",

        name:
            "Guaifenesin",

        brandNames: [],

        drugClass: [
            "Expectorant"
        ],

        class:
            "Expectorant",

        route:
            "oral",

        dosageForms: [
            "oral solution",
            "oral liquid"
        ],

        formulations: [
            {
                dosageForm:
                    "oral solution",

                concentration: {
                    amount: 100,
                    unit: "mg",
                    volume: 5,
                    volumeUnit: "mL"
                },

                display:
                    "100 mg/5 mL"
            }
        ],

        coughType: [
            "wet",
            "productive"
        ],

        coughCategory:
            "Wet / Productive Cough",

        therapeuticRole:
            "Expectorant",

        conditions: [
            "wet cough",
            "productive cough",
            "chest congestion",
            "thick respiratory mucus"
        ],

        indications:
            "Helps loosen phlegm and thin bronchial secretions to make coughs more productive.",

        moa:
            "Increases the volume and reduces the viscosity of respiratory secretions, facilitating mucus clearance through coughing.",

        pediatric: {
            minimumAgeYears: 4
        },

        dosing: {

            calculatorReady: true,

            regimens: [

                {
                    id:
                        "guaifenesin-4-to-under-6",

                    condition:
                        "wet cough",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 4,
                    maximumAgeYears: 5.99,

                    doseMin: 50,
                    doseMax: 100,

                    doseUnit:
                        "mg/dose",

                    volumeMin: 2.5,
                    volumeMax: 5,

                    volumeUnit:
                        "mL",

                    frequency:
                        6,

                    frequencyText:
                        "Every 4 hours as needed",

                    maximumDosesPer24Hours:
                        6
                },

                {
                    id:
                        "guaifenesin-6-to-under-12",

                    condition:
                        "wet cough",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 6,
                    maximumAgeYears: 11.99,

                    doseMin: 100,
                    doseMax: 200,

                    doseUnit:
                        "mg/dose",

                    volumeMin: 5,
                    volumeMax: 10,

                    volumeUnit:
                        "mL",

                    frequency:
                        6,

                    frequencyText:
                        "Every 4 hours as needed",

                    maximumDosesPer24Hours:
                        6
                },

                {
                    id:
                        "guaifenesin-12-plus",

                    condition:
                        "wet cough",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 12,

                    doseMin: 200,
                    doseMax: 400,

                    doseUnit:
                        "mg/dose",

                    volumeMin: 10,
                    volumeMax: 20,

                    volumeUnit:
                        "mL",

                    frequency:
                        6,

                    frequencyText:
                        "Every 4 hours as needed",

                    maximumDosesPer24Hours:
                        6
                }

            ]

        },

        calculatorReady:
            true,

        notes:
            "Age-based dosing is used for the referenced 100 mg/5 mL formulation. Guaifenesin is intended for productive cough and chest congestion. Persistent or chronic cough requires assessment.",

        references: [

            {
                id:
                    "dailymed-guaifenesin",

                organization:
                    "DailyMed",

                title:
                    "Guaifenesin Liquid",

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fd35036c-b722-48a3-85fd-60471beb6e74"
            },

            {
                id:
                    "dailymed-childrens-guaifenesin",

                organization:
                    "DailyMed",

                title:
                    "Children's Guaifenesin Oral Solution",

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6ab51aca-4ee8-401b-a0db-746dcde92517"
            }

        ]
    },


    /* =====================================================
       3. DEXTROMETHORPHAN + GUAIFENESIN
       COUGH + CHEST CONGESTION
    ===================================================== */

    {
        id:
            "dextromethorphan-guaifenesin",

        genericName:
            "Dextromethorphan Hydrobromide + Guaifenesin",

        name:
            "Dextromethorphan + Guaifenesin",

        brandNames: [],

        drugClass: [
            "Antitussive",
            "Expectorant",
            "Combination cough medicine"
        ],

        class:
            "Antitussive · Expectorant",

        route:
            "oral",

        dosageForms: [
            "oral liquid"
        ],

        formulations: [
            {
                dosageForm:
                    "oral liquid",

                concentration: {
                    components: [
                        {
                            name:
                                "Dextromethorphan HBr",

                            amount:
                                5,

                            unit:
                                "mg"
                        },
                        {
                            name:
                                "Guaifenesin",

                            amount:
                                100,

                            unit:
                                "mg"
                        }
                    ],

                    volume:
                        5,

                    volumeUnit:
                        "mL"
                },

                display:
                    "Dextromethorphan HBr 5 mg + Guaifenesin 100 mg / 5 mL"
            }
        ],

        coughType: [
            "acute cough",
            "cough with chest congestion"
        ],

        coughCategory:
            "Cough + Chest Congestion",

        therapeuticRole:
            "Antitussive + Expectorant",

        conditions: [
            "acute cough",
            "chest congestion",
            "minor throat irritation",
            "minor bronchial irritation"
        ],

        indications:
            "Temporary relief of cough due to minor throat and bronchial irritation while helping loosen phlegm.",

        moa:
            "Dextromethorphan suppresses the cough reflex while guaifenesin helps loosen and thin respiratory mucus.",

        pediatric: {
            minimumAgeYears: 4
        },

        dosing: {

            calculatorReady:
                true,

            regimens: [

                {
                    id:
                        "dextromethorphan-guaifenesin-4-to-under-6",

                    condition:
                        "cough with chest congestion",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 4,
                    maximumAgeYears: 5.99,

                    volumeMin: 2.5,
                    volumeMax: 5,

                    volumeUnit:
                        "mL",

                    frequency:
                        6,

                    frequencyText:
                        "Every 4 hours as needed",

                    maximumDosesPer24Hours:
                        6,

                    componentsPer5mL: {
                        dextromethorphanMg: 5,
                        guaifenesinMg: 100
                    }
                },

                {
                    id:
                        "dextromethorphan-guaifenesin-6-to-under-12",

                    condition:
                        "cough with chest congestion",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 6,
                    maximumAgeYears: 11.99,

                    volumeMin: 5,
                    volumeMax: 10,

                    volumeUnit:
                        "mL",

                    frequency:
                        6,

                    frequencyText:
                        "Every 4 hours as needed",

                    maximumDosesPer24Hours:
                        6,

                    componentsPer5mL: {
                        dextromethorphanMg: 5,
                        guaifenesinMg: 100
                    }
                }

            ]

        },

        calculatorReady:
            true,

        notes:
            "Use only with the exact referenced combination concentration. Do not combine with another product containing dextromethorphan or guaifenesin. Persistent cough or cough associated with asthma requires clinical assessment.",

        references: [

            {
                id:
                    "dailymed-dextromethorphan-guaifenesin",

                organization:
                    "DailyMed",

                title:
                    "Children's Cough Relief: Dextromethorphan HBr + Guaifenesin",

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=975e157a-8f8d-41ad-b55b-9f9100188ccd"
            }

        ]
    },


    /* =====================================================
       4. CARBOCISTEINE
       WET / PRODUCTIVE COUGH
    ===================================================== */

    {
        id:
            "carbocisteine",

        genericName:
            "Carbocisteine",

        name:
            "Carbocisteine",

        brandNames: [],

        drugClass: [
            "Mucolytic"
        ],

        class:
            "Mucolytic",

        route:
            "oral",

        dosageForms: [
            "oral solution"
        ],

        formulations: [
            {
                dosageForm:
                    "oral solution",

                concentration: {
                    amount: 250,
                    unit: "mg",
                    volume: 5,
                    volumeUnit: "mL"
                },

                display:
                    "250 mg/5 mL"
            }
        ],

        coughType: [
            "wet",
            "productive"
        ],

        coughCategory:
            "Wet / Productive Cough",

        therapeuticRole:
            "Mucolytic",

        conditions: [
            "wet cough",
            "productive cough",
            "viscous mucus",
            "chesty cough"
        ],

        indications:
            "Mucolytic treatment for respiratory conditions associated with excessive or viscous mucus.",

        moa:
            "Reduces the viscosity of bronchial secretions and facilitates mucus clearance.",

        pediatric: {
            minimumAgeYears: 2
        },

        dosing: {

            calculatorReady:
                true,

            regimens: [

                {
                    id:
                        "carbocisteine-2-to-under-5",

                    condition:
                        "wet cough with viscous mucus",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 2,
                    maximumAgeYears: 4.99,

                    volumeMin: 1.25,
                    volumeMax: 2.5,

                    volumeUnit:
                        "mL",

                    doseMin: 62.5,
                    doseMax: 125,

                    doseUnit:
                        "mg/dose",

                    frequency:
                        4,

                    frequencyText:
                        "4 times daily"
                },

                {
                    id:
                        "carbocisteine-5-to-under-12",

                    condition:
                        "wet cough with viscous mucus",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 5,
                    maximumAgeYears: 11.99,

                    volume: 5,

                    volumeUnit:
                        "mL",

                    dose: 250,

                    doseUnit:
                        "mg/dose",

                    frequency:
                        3,

                    frequencyText:
                        "3 times daily"
                }

            ]

        },

        calculatorReady:
            true,

        notes:
            "The referenced 250 mg/5 mL oral solution provides age-based dosing for children 2–5 years and 5–12 years. Use for productive cough associated with excessive or viscous secretions. Consider gastrointestinal precautions, including history of peptic ulcer disease.",

        references: [

            {
                id:
                    "emc-carbocisteine",

                organization:
                    "electronic Medicines Compendium",

                title:
                    "Carbocisteine 250 mg/5 mL Oral Solution — Summary of Product Characteristics",

                url:
                    "https://www.medicines.org.uk/emc/product/13333/smpc"
            }

        ]
    },


    /* =====================================================
       5. BROMHEXINE
       WET / PRODUCTIVE COUGH
    ===================================================== */

    {
        id:
            "bromhexine",

        genericName:
            "Bromhexine Hydrochloride",

        name:
            "Bromhexine",

        brandNames: [
            "Bisolvon"
        ],

        drugClass: [
            "Mucolytic",
            "Expectorant"
        ],

        class:
            "Mucolytic · Expectorant",

        route:
            "oral",

        dosageForms: [
            "oral solution",
            "syrup"
        ],

        formulations: [
            {
                dosageForm:
                    "oral solution",

                concentration: {
                    amount: 4,
                    unit: "mg",
                    volume: 5,
                    volumeUnit: "mL"
                },

                display:
                    "4 mg/5 mL"
            }
        ],

        coughType: [
            "wet",
            "productive"
        ],

        coughCategory:
            "Wet / Productive Cough",

        therapeuticRole:
            "Mucolytic",

        conditions: [
            "wet cough",
            "productive cough",
            "viscous mucus",
            "chesty cough"
        ],

        indications:
            "Mucolytic treatment for respiratory conditions associated with thick or viscous mucus.",

        moa:
            "Reduces the viscosity of bronchial secretions and facilitates mucus transport and expectoration.",

        pediatric: {
            minimumAgeYears: 2
        },

        dosing: {

            calculatorReady:
                true,

            regimens: [

                {
                    id:
                        "bromhexine-2-to-under-5",

                    condition:
                        "wet cough with viscous mucus",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 2,
                    maximumAgeYears: 4.99,

                    volume: 5,

                    volumeUnit:
                        "mL",

                    dose: 4,

                    doseUnit:
                        "mg/dose",

                    frequency:
                        2,

                    frequencyText:
                        "Twice daily"
                },

                {
                    id:
                        "bromhexine-5-to-12",

                    condition:
                        "wet cough with viscous mucus",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 5,
                    maximumAgeYears: 12,

                    volume: 5,

                    volumeUnit:
                        "mL",

                    dose: 4,

                    doseUnit:
                        "mg/dose",

                    frequency:
                        4,

                    frequencyText:
                        "4 times daily"
                }

            ]

        },

        calculatorReady:
            true,

        notes:
            "The referenced Bisolvon 4 mg/5 mL oral solution provides 5 mL twice daily for children 2–5 years and 5 mL four times daily for children over 5 to 12 years. Verify the exact local product formulation before use.",

        references: [

            {
                id:
                    "hpra-bisolvon",

                organization:
                    "Health Products Regulatory Authority",

                title:
                    "Bisolvon 4 mg/5 mL Oral Solution — Summary of Product Characteristics",

                year:
                    2023,

                url:
                    "https://www.hpra.ie/img/uploaded/swedocuments/Licence_PA23180-015-001_15112023155448.pdf"
            }

        ]
    },


    /* =====================================================
       6. ACETYLCYSTEINE
       WET / PRODUCTIVE COUGH
    ===================================================== */

    {
        id:
            "acetylcysteine",

        genericName:
            "Acetylcysteine",

        name:
            "Acetylcysteine",

        brandNames: [
            "N-acetylcysteine",
            "NAC"
        ],

        drugClass: [
            "Mucolytic"
        ],

        class:
            "Mucolytic",

        route:
            "oral",

        dosageForms: [
            "oral syrup"
        ],

        formulations: [
            {
                dosageForm:
                    "oral syrup",

                concentration: {
                    amount: 200,
                    unit: "mg",
                    volume: 5,
                    volumeUnit: "mL"
                },

                display:
                    "200 mg/5 mL"
            }
        ],

        coughType: [
            "wet",
            "productive"
        ],

        coughCategory:
            "Wet / Productive Cough",

        therapeuticRole:
            "Mucolytic",

        conditions: [
            "wet cough",
            "productive cough",
            "thick mucus",
            "viscous respiratory secretions"
        ],

        indications:
            "Mucolytic treatment for thick and viscous respiratory secretions.",

        moa:
            "Breaks disulfide bonds within mucoprotein complexes, reducing mucus viscosity.",

        pediatric: {
            minimumAgeYears: 2
        },

        dosing: {

            calculatorReady:
                true,

            regimens: [

                {
                    id:
                        "acetylcysteine-2-to-under-7",

                    condition:
                        "wet cough with thick mucus",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 2,
                    maximumAgeYears: 6.99,

                    volume: 5,

                    volumeUnit:
                        "mL",

                    dose: 200,

                    doseUnit:
                        "mg/dose",

                    frequency:
                        2,

                    frequencyText:
                        "Twice daily"
                },

                {
                    id:
                        "acetylcysteine-7-plus",

                    condition:
                        "wet cough with thick mucus",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 7,

                    volume: 5,

                    volumeUnit:
                        "mL",

                    dose: 200,

                    doseUnit:
                        "mg/dose",

                    frequency:
                        3,

                    frequencyText:
                        "3 times daily"
                }

            ]

        },

        calculatorReady:
            true,

        notes:
            "The referenced 200 mg/5 mL oral syrup provides age-based dosing. Verify the exact product and concentration because acetylcysteine oral formulations vary. Mucolytic use in very young children requires particular caution because increased secretions may be difficult to clear.",

        references: [

            {
                id:
                    "dosecare-acetylcysteine-reference",

                organization:
                    "Verified product information",

                title:
                    "Acetylcysteine 4% Pediatric Oral Syrup",

                sourceType:
                    "Official product information"
            }

        ]
    },


    /* =====================================================
       7. BUTAMIRATE
       DRY COUGH
    ===================================================== */

    {
        id:
            "butamirate",

        genericName:
            "Butamirate Citrate",

        name:
            "Butamirate",

        brandNames: [],

        drugClass: [
            "Antitussive",
            "Non-opioid cough suppressant"
        ],

        class:
            "Antitussive · Non-opioid",

        route:
            "oral",

        dosageForms: [
            "syrup"
        ],

        formulations: [
            {
                dosageForm:
                    "syrup",

                concentration: {
                    amount: 7.5,
                    unit: "mg",
                    volume: 5,
                    volumeUnit: "mL"
                },

                display:
                    "7.5 mg/5 mL"
            }
        ],

        coughType: [
            "dry"
        ],

        coughCategory:
            "Dry / Non-productive Cough",

        therapeuticRole:
            "Antitussive",

        conditions: [
            "dry cough",
            "non-productive cough",
            "irritative cough"
        ],

        indications:
            "Symptomatic treatment of non-productive cough.",

        moa:
            "Non-opioid centrally acting antitussive that suppresses the cough reflex.",

        pediatric: {
            minimumAgeYears: 4
        },

        dosing: {

            calculatorReady:
                true,

            regimens: [

                {
                    id:
                        "butamirate-4-to-under-6",

                    condition:
                        "dry cough",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 4,
                    maximumAgeYears: 5.99,

                    volume: 5,

                    volumeUnit:
                        "mL",

                    dose: 7.5,

                    doseUnit:
                        "mg/dose",

                    frequency:
                        3,

                    frequencyText:
                        "3 times daily"
                },

                {
                    id:
                        "butamirate-6-to-under-12",

                    condition:
                        "dry cough",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 6,
                    maximumAgeYears: 11.99,

                    volume: 10,

                    volumeUnit:
                        "mL",

                    dose: 15,

                    doseUnit:
                        "mg/dose",

                    frequency:
                        3,

                    frequencyText:
                        "3 times daily"
                },

                {
                    id:
                        "butamirate-12-plus",

                    condition:
                        "dry cough",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 12,

                    volume: 15,

                    volumeUnit:
                        "mL",

                    dose: 22.5,

                    doseUnit:
                        "mg/dose",

                    frequency:
                        3,

                    frequencyText:
                        "3 times daily"
                }

            ]

        },

        calculatorReady:
            true,

        notes:
            "Use only for non-productive cough. Persistent cough requires reassessment. Do not routinely combine a cough suppressant with a mucolytic/expectorant when suppression of cough could impair mucus clearance.",

        references: [

            {
                id:
                    "butamirate-product-information",

                organization:
                    "Ethiopian Food and Drug Authority",

                title:
                    "Butagan 7.5 mg/5 mL Syrup — Summary of Product Characteristics",

                sourceType:
                    "Official product information"
            },

            {
                id:
                    "butamirate-manufacturer",

                organization:
                    "Haleon HealthPartner",

                title:
                    "Butamirate — Pediatric Posology Information",

                sourceType:
                    "Manufacturer healthcare professional information"
            }

        ]
    },


    /* =====================================================
       8. LEVODROPROPIZINE
       DRY COUGH
    ===================================================== */

    {
        id:
            "levodropropizine",

        genericName:
            "Levodropropizine",

        name:
            "Levodropropizine",

        brandNames: [],

        drugClass: [
            "Antitussive",
            "Peripheral cough suppressant"
        ],

        class:
            "Antitussive · Peripheral",

        route:
            "oral",

        dosageForms: [
            "syrup",
            "oral solution"
        ],

        formulations: [
            {
                dosageForm:
                    "syrup",

                concentration: {
                    amount: 30,
                    unit: "mg",
                    volume: 5,
                    volumeUnit: "mL"
                },

                display:
                    "30 mg/5 mL"
            }
        ],

        coughType: [
            "dry"
        ],

        coughCategory:
            "Dry / Non-productive Cough",

        therapeuticRole:
            "Antitussive",

        conditions: [
            "dry cough",
            "non-productive cough",
            "irritative cough"
        ],

        indications:
            "Symptomatic treatment of non-productive cough.",

        moa:
            "Peripherally acting antitussive that reduces excitability of tracheobronchial afferent pathways involved in the cough reflex.",

        pediatric: {
            minimumAgeYears: 2
        },

        dosing: {

            calculatorReady:
                true,

            regimens: [

                {
                    id:
                        "levodropropizine-dry-cough",

                    condition:
                        "dry cough",

                    type:
                        "mg_per_kg_per_dose",

                    minDose:
                        1,

                    maxDose:
                        1,

                    doseUnit:
                        "mg/kg/dose",

                    frequency:
                        3,

                    frequencyText:
                        "3 times daily",

                    maximumDosesPer24Hours:
                        3,

                    maximumDailyDose:
                        3,

                    maximumDailyDoseUnit:
                        "mg/kg/day",

                    minimumAgeYears:
                        2
                }

            ]

        },

        calculatorReady:
            true,

        notes:
            "For the referenced 30 mg/5 mL syrup, children older than 2 years receive 1 mg/kg per dose three times daily, with at least 6 hours between doses and a maximum total daily dose of 3 mg/kg/day. Treatment should not exceed 7 days without medical advice. Do not use when excessive mucus is present.",

        references: [

            {
                id:
                    "levodropropizine-regulatory",

                organization:
                    "Philippine Food and Drug Administration",

                title:
                    "Levodropropizine — Product Information",

                sourceType:
                    "Official regulatory product information"
            },

            {
                id:
                    "levodropropizine-swissmedic",

                organization:
                    "Swissmedic",

                title:
                    "Levocalm — Summary Report on Authorisation",

                sourceType:
                    "Regulatory assessment"
            }

        ]
    },


    /* =====================================================
       9. AMBROXOL
       WET / PRODUCTIVE COUGH
    ===================================================== */

    {
        id:
            "ambroxol",

        genericName:
            "Ambroxol Hydrochloride",

        name:
            "Ambroxol",

        brandNames: [],

        drugClass: [
            "Mucolytic",
            "Secretolytic",
            "Expectorant"
        ],

        class:
            "Mucolytic · Secretolytic · Expectorant",

        route:
            "oral",

        dosageForms: [
            "syrup",
            "oral solution"
        ],

        formulations: [
            {
                dosageForm:
                    "syrup",

                concentration: {
                    amount: 15,
                    unit: "mg",
                    volume: 5,
                    volumeUnit: "mL"
                },

                display:
                    "15 mg/5 mL"
            }
        ],

        coughType: [
            "wet",
            "productive"
        ],

        coughCategory:
            "Wet / Productive Cough",

        therapeuticRole:
            "Mucolytic",

        conditions: [
            "wet cough",
            "productive cough",
            "viscous respiratory secretions",
            "thick mucus"
        ],

        indications:
            "Secretolytic treatment of respiratory disorders associated with abnormal or viscous mucus.",

        moa:
            "Reduces mucus viscosity and promotes mucociliary clearance.",

        pediatric: {
            minimumAgeYears: 2
        },

        dosing: {

            calculatorReady:
                true,

            regimens: [

                {
                    id:
                        "ambroxol-2-to-under-5",

                    condition:
                        "wet cough with viscous mucus",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 2,
                    maximumAgeYears: 4.99,

                    volume: 2.5,

                    volumeUnit:
                        "mL",

                    dose: 7.5,

                    doseUnit:
                        "mg/dose",

                    frequency:
                        3,

                    frequencyText:
                        "3 times daily"
                },

                {
                    id:
                        "ambroxol-5-plus",

                    condition:
                        "wet cough with viscous mucus",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 5,

                    volume: 5,

                    volumeUnit:
                        "mL",

                    dose: 15,

                    doseUnit:
                        "mg/dose",

                    frequencyOptions: [
                        2,
                        3
                    ],

                    frequencyText:
                        "2–3 times daily"
                }

            ]

        },

        calculatorReady:
            true,

        notes:
            "The referenced 15 mg/5 mL oral syrup provides 2.5 mL three times daily for children 2–5 years and 5 mL 2–3 times daily for children older than 5 years. Verify the exact product formulation. Do not routinely combine mucolytics with cough suppressants when cough suppression could impair mucus clearance.",

        references: [

            {
                id:
                    "ambroxol-pediamecum",

                organization:
                    "Asociación Española de Pediatría",

                title:
                    "Pediamécum — Ambroxol",

                sourceType:
                    "Pediatric professional reference"
            },

            {
                id:
                    "ambroxol-product-information",

                organization:
                    "Ethiopian Food and Drug Authority",

                title:
                    "Sekrol Pediatric Syrup 15 mg/5 mL — Summary of Product Characteristics",

                sourceType:
                    "Official product information"
            }

        ]
    },


    /* =====================================================
       10. CHLORPHENAMINE
       FIRST-GENERATION ANTIHISTAMINE
    ===================================================== */

    {
        id:
            "chlorphenamine",

        genericName:
            "Chlorphenamine Maleate",

        name:
            "Chlorphenamine",

        brandNames: [
            "Piriton"
        ],

        drugClass: [
            "Antihistamine",
            "H1 receptor antagonist",
            "First-generation antihistamine"
        ],

        class:
            "First-generation H1 Antihistamine · Sedating",

        antihistamineGeneration:
            "first_generation",

        sedation:
            "sedating",

        sedationLevel:
            "high",

        route:
            "oral",

        dosageForms: [
            "syrup",
            "oral solution"
        ],

        formulations: [
            {
                dosageForm:
                    "syrup",

                concentration: {
                    amount: 2,
                    unit: "mg",
                    volume: 5,
                    volumeUnit: "mL"
                },

                display:
                    "2 mg/5 mL"
            }
        ],

        conditions: [
            "allergic rhinitis",
            "hay fever",
            "urticaria",
            "angioedema",
            "allergic conditions"
        ],

        indications:
            "Symptomatic relief of allergic conditions responsive to antihistamines.",

        moa:
            "First-generation H1-receptor antagonist that reduces histamine-mediated effects and may cause CNS sedation.",

        pediatric: {
            minimumAgeYears: 1
        },

        dosing: {

            calculatorReady:
                true,

            regimens: [

                {
                    id:
                        "chlorphenamine-1-to-under-2",

                    condition:
                        "allergic condition",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 1,
                    maximumAgeYears: 1.99,

                    dose: 1,

                    doseUnit:
                        "mg/dose",

                    volume: 2.5,

                    volumeUnit:
                        "mL",

                    frequency:
                        2,

                    frequencyText:
                        "Twice daily"
                },

                {
                    id:
                        "chlorphenamine-2-to-under-6",

                    condition:
                        "allergic condition",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 2,
                    maximumAgeYears: 5.99,

                    dose: 1,

                    doseUnit:
                        "mg/dose",

                    volume: 2.5,

                    volumeUnit:
                        "mL",

                    frequency:
                        4,

                    frequencyText:
                        "Every 4–6 hours as needed"
                },

                {
                    id:
                        "chlorphenamine-6-to-under-12",

                    condition:
                        "allergic condition",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 6,
                    maximumAgeYears: 11.99,

                    dose: 2,

                    doseUnit:
                        "mg/dose",

                    volume: 5,

                    volumeUnit:
                        "mL",

                    frequency:
                        4,

                    frequencyText:
                        "Every 4–6 hours as needed"
                },

                {
                    id:
                        "chlorphenamine-12-plus",

                    condition:
                        "allergic condition",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 12,

                    dose: 4,

                    doseUnit:
                        "mg/dose",

                    volume: 10,

                    volumeUnit:
                        "mL",

                    frequency:
                        4,

                    frequencyText:
                        "Every 4–6 hours as needed"
                }

            ]

        },

        calculatorReady:
            true,

        notes:
            "Sedating first-generation antihistamine. Drowsiness and anticholinergic effects are important considerations. Avoid duplication with other antihistamine-containing products and follow the specific product maximum daily dose.",

        references: [

            {
                id:
                    "chlorphenamine-product-information",

                organization:
                    "Verified product information",

                title:
                    "Chlorphenamine 2 mg/5 mL Oral Liquid",

                sourceType:
                    "Official product information"
            }

        ]
    },


    /* =====================================================
       11. DIPHENHYDRAMINE
       FIRST-GENERATION ANTIHISTAMINE
    ===================================================== */

    {
        id:
            "diphenhydramine",

        genericName:
            "Diphenhydramine Hydrochloride",

        name:
            "Diphenhydramine",

        brandNames: [
            "Benadryl"
        ],

        drugClass: [
            "Antihistamine",
            "H1 receptor antagonist",
            "First-generation antihistamine"
        ],

        class:
            "First-generation H1 Antihistamine · Sedating",

        antihistamineGeneration:
            "first_generation",

        sedation:
            "sedating",

        sedationLevel:
            "high",

        route:
            "oral",

        dosageForms: [
            "oral solution",
            "oral liquid"
        ],

        formulations: [
            {
                dosageForm:
                    "oral solution",

                concentration: {
                    amount: 12.5,
                    unit: "mg",
                    volume: 5,
                    volumeUnit: "mL"
                },

                display:
                    "12.5 mg/5 mL"
            }
        ],

        conditions: [
            "allergic rhinitis",
            "hay fever",
            "runny nose",
            "sneezing",
            "itchy eyes",
            "watery eyes"
        ],

        indications:
            "Temporary relief of symptoms associated with upper respiratory allergies.",

        moa:
            "First-generation H1-receptor antagonist that blocks histamine-mediated effects and produces CNS sedation.",

        pediatric: {
            minimumAgeYears: 2
        },

        dosing: {

            calculatorReady:
                true,

            regimens: [

                {
                    id:
                        "diphenhydramine-2-to-under-6",

                    condition:
                        "allergic condition",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 2,
                    maximumAgeYears: 5.99,

                    physicianDirected:
                        true,

                    dose:
                        null,

                    volume:
                        null,

                    frequencyText:
                        "Only when directed by a physician"
                },

                {
                    id:
                        "diphenhydramine-6-to-under-12",

                    condition:
                        "allergic condition",

                    type:
                        "fixed_age_dose",

                    minimumAgeYears: 6,
                    maximumAgeYears: 11.99,

                    doseMin: 12.5,
                    doseMax: 25,

                    doseUnit:
                        "mg/dose",

                    volumeMin: 5,
                    volumeMax: 10,

                    volumeUnit:
                        "mL",

                    frequency:
                        6,

                    frequencyText:
                        "Every 4–6 hours as needed",

                    maximumDosesPer24Hours:
                        6
                }

            ]

        },

        calculatorReady:
            true,

        notes:
            "The referenced 12.5 mg/5 mL oral solution should not be used in children under 2 years. Children 2–5 years should receive it only when directed by a physician. Do not use diphenhydramine to make a child sleepy. Avoid duplication with other diphenhydramine-containing products.",

        references: [

            {
                id:
                    "dailymed-diphenhydramine",

                organization:
                    "DailyMed",

                title:
                    "Diphenhydramine HCl Oral Solution 12.5 mg/5 mL",

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7406e4e4-3093-4cd1-80ce-93f7b6db2a87"
            }

        ]
    },


    /* =====================================================
       12. HYDROXYZINE
       FIRST-GENERATION ANTIHISTAMINE
    ===================================================== */

    {
        id:
            "hydroxyzine",

        genericName:
            "Hydroxyzine Hydrochloride",

        name:
            "Hydroxyzine",

        brandNames: [],

        drugClass: [
            "Antihistamine",
            "H1 receptor antagonist",
            "First-generation antihistamine"
        ],

        class:
            "First-generation H1 Antihistamine · Sedating",

        antihistamineGeneration:
            "first_generation",

        sedation:
            "sedating",

        sedationLevel:
            "high",

        route:
            "oral",

        dosageForms: [
            "syrup",
            "oral solution"
        ],

        formulations: [
            {
                dosageForm:
                    "oral solution",

                concentration: {
                    amount: 10,
                    unit: "mg",
                    volume: 5,
                    volumeUnit: "mL"
                },

                display:
                    "10 mg/5 mL"
            }
        ],

        conditions: [
            "allergic pruritus",
            "chronic urticaria",
            "atopic dermatitis",
            "contact dermatitis",
            "histamine-mediated pruritus"
        ],

        indications:
            "Symptomatic management of pruritus associated with allergic conditions.",

        moa:
            "First-generation H1-receptor antagonist with antihistaminic and sedative effects.",

        pediatric: {
            minimumAgeYears: 0
        },

        dosing: {

            calculatorReady:
                true,

            regimens: [

                {
                    id:
                        "hydroxyzine-allergic-pruritus-under-6",

                    condition:
                        "allergic pruritus",

                    type:
                        "fixed_daily_dose",

                    maximumAgeYears:
                        5.99,

                    totalDailyDose:
                        50,

                    totalDailyDoseUnit:
                        "mg/day",

                    totalDailyVolume:
                        25,

                    volumeUnit:
                        "mL/day",

                    frequencyText:
                        "In divided doses"
                },

                {
                    id:
                        "hydroxyzine-allergic-pruritus-6-plus",

                    condition:
                        "allergic pruritus",

                    type:
                        "fixed_daily_dose",

                    minimumAgeYears:
                        6,

                    totalDailyDoseMin:
                        50,

                    totalDailyDoseMax:
                        100,

                    totalDailyDoseUnit:
                        "mg/day",

                    totalDailyVolumeMin:
                        25,

                    totalDailyVolumeMax:
                        50,

                    volumeUnit:
                        "mL/day",

                    frequencyText:
                        "In divided doses"
                }

            ]

        },

        calculatorReady:
            true,

        notes:
            "The referenced 10 mg/5 mL oral solution provides age-based dosing for allergic pruritus. Hydroxyzine is sedating and requires attention to CNS effects and clinically relevant precautions. The exact dosing schedule should follow the specific product information and indication.",

        references: [

            {
                id:
                    "hydroxyzine-product-information",

                organization:
                    "Verified product information",

                title:
                    "Hydroxyzine Hydrochloride 10 mg/5 mL Oral Solution",

                sourceType:
                    "Official product information"
            }

        ]
    }

];


/* =========================================================
   ADD RESPIRATORY MEDICINES TO CENTRAL DATABASE
========================================================= */

respiratoryMedicines.forEach(
    medicine => {

        if (
            !medicines.some(
                existingMedicine =>
                    String(existingMedicine.id) ===
                    String(medicine.id)
            )
        ) {

            medicines.push(
                medicine
            );

        }

    }
);


/* =========================================================
   RESPIRATORY DATABASE STATUS
========================================================= */

function getRespiratoryMedicines() {

    return respiratoryMedicines;

}


function getRespiratoryMedicineCount() {

    return respiratoryMedicines.length;

}


/* =========================================================
   END OF RESPIRATORY DATABASE
========================================================= */
