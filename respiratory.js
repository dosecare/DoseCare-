/* =========================================
   DoseCare
   RESPIRATORY SYSTEM DATABASE
========================================= */

/*
    System:
    Respiratory

    Main pediatric medicines included:

    1. Salbutamol
    2. Budesonide
    3. Ipratropium
    4. Montelukast

    IMPORTANT:
    These medicines are added to the central
    DoseCare database automatically.

    Do NOT add them directly to medicine.js.
*/


const respiratoryMedicines = [


    /* =========================================
       SALBUTAMOL
       Albuterol
    ========================================= */

    {

        id:
            "salbutamol",

        genericName:
            "Salbutamol",

        name:
            "Salbutamol",

        brandNames: [
            "Ventolin",
            "ProAir",
            "Airomir"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "Short-acting beta2 agonist",
            "Bronchodilator",
            "SABA"
        ],

        class:
            "Short-acting β2-agonist · Bronchodilator",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "asthma",
            "acute bronchospasm",
            "reversible airway obstruction",
            "wheezing"
        ],

        condition:
            "Asthma · Acute bronchospasm",

        route:
            "Inhalation",

        dosageForms: [
            "metered-dose inhaler",
            "nebulizer solution"
        ],

        commonPediatricConcentrations: [
            "100 micrograms/actuation",
            "0.63 mg/3 mL",
            "1.25 mg/3 mL",
            "5 mg/mL nebulizer solution"
        ],


        indications:
            "Relief of bronchospasm and wheezing associated with asthma and reversible obstructive airway disease.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Selective stimulation of β2-adrenergic receptors in bronchial smooth muscle causes relaxation of airway smooth muscle and bronchodilation.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Dose depends on the inhaled formulation, age and clinical severity. Inhaled salbutamol is generally preferred over systemic administration for acute bronchospasm.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "age_and_formulation_based",

            regimens: {

                "nebulizer_2_to_12_years": {

                    minimumAgeYears:
                        2,

                    maximumAgeYears:
                        12,

                    options: [

                        {
                            dose:
                                0.63,

                            unit:
                                "mg/dose",

                            frequency:
                                "3–4 times daily as needed"
                        },

                        {
                            dose:
                                1.25,

                            unit:
                                "mg/dose",

                            frequency:
                                "3–4 times daily as needed"
                        }

                    ]

                },

                "inhaler": {

                    options: [

                        {
                            dose:
                                1,

                            unit:
                                "puff",

                            frequency:
                                "as directed"
                        },

                        {
                            dose:
                                2,

                            unit:
                                "puffs",

                            frequency:
                                "as directed"
                        }

                    ]

                }

            },

            route:
                "inhalation",

            minimumAgeMonths:
                24,

            configured:
                true

        },


        indicationSpecific:
            true,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [
            "Hypersensitivity to salbutamol or any component"
        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [
            "Tachycardia",
            "Cardiac arrhythmias",
            "Hyperthyroidism",
            "Diabetes mellitus",
            "Hypokalemia",
            "Paradoxical bronchospasm"
        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [
            "Tremor",
            "Nervousness",
            "Headache",
            "Tachycardia",
            "Palpitations",
            "Hypokalemia",
            "Muscle cramps"
        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Salbutamol is a reliever/rescue bronchodilator and does not replace controller therapy for persistent asthma. Excessive use may indicate poor asthma control. Verify the inhaler or nebulizer concentration before calculating the dose.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model List of Essential Medicines for Children — 10th List",

                year:
                    2025,

                url:
                    "https://www.who.int/publications/i/item/B09475"
            },

            {
                organization:
                    "DailyMed",

                title:
                    "Albuterol Sulfate Inhalation Solution",

                year:
                    2026,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4e48ccbe-3ec0-4bf2-be28-83eb9baa63d6"
            }

        ]

    },


    /* =========================================
       BUDESONIDE
    ========================================= */

    {

        id:
            "budesonide",

        genericName:
            "Budesonide",

        name:
            "Budesonide",

        brandNames: [
            "Pulmicort"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "Inhaled corticosteroid",
            "ICS",
            "Anti-inflammatory"
        ],

        class:
            "Inhaled Corticosteroid · Anti-inflammatory",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "asthma",
            "persistent asthma",
            "airway inflammation"
        ],

        condition:
            "Asthma · Airway inflammation",

        route:
            "Inhalation",

        dosageForms: [
            "nebulizer suspension",
            "dry powder inhaler",
            "metered-dose inhaler"
        ],

        commonPediatricConcentrations: [
            "0.25 mg/2 mL",
            "0.5 mg/2 mL",
            "100 micrograms/actuation",
            "200 micrograms/actuation"
        ],


        indications:
            "Maintenance treatment and prophylactic therapy of asthma in appropriate pediatric patients.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Activates glucocorticoid receptors and reduces airway inflammation, inflammatory cell activity and mediator release, improving airway responsiveness and asthma control.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Nebulized budesonide is used for maintenance treatment of asthma in children 12 months to 8 years. It is not a rescue medicine for acute bronchospasm.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "age_and_previous_therapy_based",

            regimens: {

                "bronchodilator_only": {

                    minimumAgeMonths:
                        12,

                    maximumAgeYears:
                        8,

                    options: [

                        {
                            dose:
                                0.5,

                            unit:
                                "mg/day",

                            frequency:
                                "once daily"
                        },

                        {
                            dose:
                                0.25,

                            unit:
                                "mg/dose",

                            frequency:
                                "twice daily"
                        }

                    ]

                },

                "previous_inhaled_corticosteroid": {

                    minimumAgeMonths:
                        12,

                    maximumAgeYears:
                        8,

                    options: [

                        {
                            dose:
                                0.5,

                            unit:
                                "mg/day",

                            frequency:
                                "once daily"
                        },

                        {
                            dose:
                                0.25,

                            unit:
                                "mg/dose",

                            frequency:
                                "twice daily"
                        },

                        {
                            dose:
                                0.5,

                            unit:
                                "mg/dose",

                            frequency:
                                "twice daily"
                        }

                    ]

                },

                "previous_oral_corticosteroid": {

                    minimumAgeMonths:
                        12,

                    maximumAgeYears:
                        8,

                    options: [

                        {
                            dose:
                                0.5,

                            unit:
                                "mg/dose",

                            frequency:
                                "twice daily"
                        },

                        {
                            dose:
                                1,

                            unit:
                                "mg/day",

                            frequency:
                                "once daily"
                        }

                    ]

                }

            },

            route:
                "inhalation",

            minimumAgeMonths:
                12,

            maximumAgeYears:
                8,

            configured:
                true

        },


        indicationSpecific:
            true,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [
            "Hypersensitivity to budesonide or formulation components"
        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [
            "Growth suppression with long-term corticosteroid exposure",
            "Oral candidiasis",
            "Adrenal suppression with high exposure",
            "Reduced bone mineral density with prolonged use",
            "Tuberculosis or untreated systemic infection"
        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [
            "Oral candidiasis",
            "Hoarseness",
            "Cough",
            "Throat irritation",
            "Growth effects with prolonged use",
            "Adrenal suppression at high exposure"
        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Budesonide is a controller medicine, not a rescue medicine. Rinse the mouth after inhalation to reduce the risk of oral candidiasis. Use the lowest effective maintenance dose.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model List of Essential Medicines for Children — 10th List",

                year:
                    2025,

                url:
                    "https://www.who.int/publications/i/item/B09475"
            },

            {
                organization:
                    "DailyMed",

                title:
                    "Budesonide Inhalation Suspension",

                year:
                    2026,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e8ef9489-83a2-4817-b21c-ea3fecd8c8dd"
            }

        ]

    },


    /* =========================================
       IPRATROPIUM
    ========================================= */

    {

        id:
            "ipratropium",

        genericName:
            "Ipratropium",

        name:
            "Ipratropium",

        brandNames: [
            "Atrovent"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "Anticholinergic",
            "Muscarinic antagonist",
            "Bronchodilator"
        ],

        class:
            "Anticholinergic · Bronchodilator",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "acute asthma",
            "acute bronchospasm",
            "airway obstruction"
        ],

        condition:
            "Acute bronchospasm · Asthma",

        route:
            "Inhalation",

        dosageForms: [
            "nebulizer solution",
            "metered-dose inhaler"
        ],

        commonPediatricConcentrations: [
            "0.25 mg/mL",
            "0.5 mg/2 mL",
            "17–18 micrograms/actuation"
        ],


        indications:
            "Used as an inhaled anticholinergic bronchodilator, particularly as an adjunct to beta2-agonist therapy in acute severe bronchospasm.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Blocks muscarinic acetylcholine receptors in airway smooth muscle, reducing vagally mediated bronchoconstriction and producing bronchodilation.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "In acute severe asthma, ipratropium may be used as an adjunct to inhaled beta2-agonist therapy. It is not generally used as the sole long-term controller treatment for asthma.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "age_based",

            regimens: {

                "children_12_years_and_younger": {

                    maximumAgeYears:
                        12,

                    dose:
                        0.25,

                    unit:
                        "mg/dose",

                    frequency:
                        "every 20 minutes for up to 3 doses",

                    indication:
                        "acute severe bronchospasm / severe asthma"
                },

                "children_over_12_years": {

                    minimumAgeYears:
                        13,

                    dose:
                        0.5,

                    unit:
                        "mg/dose",

                    frequency:
                        "every 20 minutes for up to 3 doses",

                    indication:
                        "acute severe bronchospasm / severe asthma"
                }

            },

            route:
                "inhalation",

            configured:
                true

        },


        indicationSpecific:
            true,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [
            "Hypersensitivity to ipratropium",
            "Hypersensitivity to atropine-like substances"
        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [
            "Glaucoma",
            "Urinary retention",
            "Prostatic obstruction",
            "Hypersensitivity to atropine derivatives"
        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [
            "Dry mouth",
            "Throat irritation",
            "Headache",
            "Blurred vision if aerosol contacts eyes",
            "Urinary retention",
            "Paradoxical bronchospasm"
        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Ipratropium is mainly an adjunct in acute severe bronchospasm rather than a routine standalone asthma controller. Avoid aerosol contact with the eyes because of the risk of ocular adverse effects.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {
                organization:
                    "American Academy of Pediatrics",

                title:
                    "Asthma management and acute exacerbation medication guidance",

                year:
                    2020,

                url:
                    "https://publications.aap.org/pediatrics/article/145/1/e20193450/36946"
            },

            {
                organization:
                    "Saudi Food and Drug Authority",

                title:
                    "Ipratropium Bromide — Product Information",

                url:
                    "https://sdi.sfda.gov.sa/home/Result?drugId=7849"
            }

        ]

    },


    /* =========================================
       MONTELUKAST
    ========================================= */

    {

        id:
            "montelukast",

        genericName:
            "Montelukast",

        name:
            "Montelukast",

        brandNames: [
            "Singulair"
        ],


        /* ---------------------------------
           CLASSIFICATION
        --------------------------------- */

        drugClass: [
            "Leukotriene receptor antagonist",
            "LTRA",
            "Anti-asthmatic"
        ],

        class:
            "Leukotriene Receptor Antagonist · Anti-asthmatic",


        /* ---------------------------------
           CLINICAL USE
        --------------------------------- */

        conditions: [
            "asthma",
            "exercise-induced bronchoconstriction",
            "allergic rhinitis"
        ],

        condition:
            "Asthma · Allergic rhinitis",

        route:
            "Oral",

        dosageForms: [
            "chewable tablet",
            "oral granules",
            "tablet"
        ],

        commonPediatricConcentrations: [
            "4 mg",
            "5 mg",
            "10 mg"
        ],


        indications:
            "Used for prophylaxis and chronic treatment of asthma in appropriate pediatric patients and for selected allergic rhinitis indications. It is not a treatment for an acute asthma attack.",


        /* ---------------------------------
           MECHANISM OF ACTION
        --------------------------------- */

        moa:
            "Selectively blocks the cysteinyl leukotriene receptor CysLT1, reducing leukotriene-mediated bronchoconstriction, airway edema and mucus production.",


        /* ---------------------------------
           PEDIATRIC INFORMATION
        --------------------------------- */

        pediatric:
            "Dose is age-based rather than weight-based. Asthma dosing is once daily in the evening. Montelukast should not be used as a rescue medicine for acute bronchospasm.",


        /* ---------------------------------
           DOSING
        --------------------------------- */

        dosing: {

            type:
                "age_based",

            regimens: {

                "asthma_12_to_23_months": {

                    minimumAgeMonths:
                        12,

                    maximumAgeMonths:
                        23,

                    dose:
                        4,

                    unit:
                        "mg",

                    dosageForm:
                        "oral granules",

                    frequency:
                        "once daily in the evening"

                },

                "asthma_2_to_5_years": {

                    minimumAgeYears:
                        2,

                    maximumAgeYears:
                        5,

                    dose:
                        4,

                    unit:
                        "mg",

                    dosageForm:
                        "chewable tablet or oral granules",

                    frequency:
                        "once daily in the evening"

                },

                "asthma_6_to_14_years": {

                    minimumAgeYears:
                        6,

                    maximumAgeYears:
                        14,

                    dose:
                        5,

                    unit:
                        "mg",

                    dosageForm:
                        "chewable tablet",

                    frequency:
                        "once daily in the evening"

                },

                "asthma_15_years_and_older": {

                    minimumAgeYears:
                        15,

                    dose:
                        10,

                    unit:
                        "mg",

                    dosageForm:
                        "tablet",

                    frequency:
                        "once daily in the evening"

                },

                "seasonal_allergic_rhinitis": {

                    minimumAgeYears:
                        2,

                    dose:
                        "age_based",

                    frequency:
                        "once daily"

                },

                "perennial_allergic_rhinitis": {

                    minimumAgeMonths:
                        6,

                    dose:
                        "age_based",

                    frequency:
                        "once daily"

                }

            },

            route:
                "oral",

            minimumAgeMonths:
                12,

            configured:
                true

        },


        indicationSpecific:
            true,


        /* ---------------------------------
           CONTRAINDICATIONS
        --------------------------------- */

        contraindications: [
            "Hypersensitivity to montelukast"
        ],


        /* ---------------------------------
           PRECAUTIONS
        --------------------------------- */

        precautions: [
            "Neuropsychiatric symptoms",
            "Behavioral changes",
            "Sleep disturbances",
            "Mood changes",
            "Suicidal thoughts or behavior"
        ],


        /* ---------------------------------
           ADVERSE EFFECTS
        --------------------------------- */

        adverseEffects: [
            "Headache",
            "Abdominal pain",
            "Neuropsychiatric effects",
            "Sleep disturbances",
            "Mood or behavioral changes"
        ],


        /* ---------------------------------
           IMPORTANT NOTES
        --------------------------------- */

        notes:
            "Montelukast is not a rescue medicine for an acute asthma attack. Because of the risk of serious neuropsychiatric events, particularly with allergic-rhinitis use, therapy should be reserved for appropriate patients when alternatives are inadequate or not tolerated.",


        /* ---------------------------------
           REFERENCES
        --------------------------------- */

        references: [

            {
                organization:
                    "DailyMed",

                title:
                    "Montelukast Sodium",

                year:
                    2026,

                url:
                    "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=901385e5-7384-4c28-a36a-7dd84c36f5fd"
            },

            {
                organization:
                    "World Health Organization",

                title:
                    "WHO Model List of Essential Medicines for Children",

                year:
                    2025,

                url:
                    "https://www.who.int/publications/i/item/B09475"
            }

        ]

    }

];


/* =========================================
   ADD RESPIRATORY MEDICINES
   TO CENTRAL DATABASE
========================================= */

respiratoryMedicines.forEach(
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
   RESPIRATORY SYSTEM
   COUGH MEDICINES

   Pediatric Oral-Liquid Medicines ONLY
========================================= */


/* =========================================
   DEXTROMETHORPHAN
   DRY COUGH
========================================= */

{
    id:
        "dextromethorphan",

    genericName:
        "Dextromethorphan Hydrobromide",

    name:
        "Dextromethorphan",

    brandNames: [],


    /* ---------------------------------
       CLASSIFICATION
    --------------------------------- */

    drugClass: [
        "Antitussive",
        "Cough suppressant"
    ],

    class:
        "Antitussive · Cough Suppressant",


    /* ---------------------------------
       COUGH CLASSIFICATION
    --------------------------------- */

    coughType: [
        "dry"
    ],

    coughCategory:
        "Dry Cough",

    therapeuticRole:
        "Antitussive",


    /* ---------------------------------
       CLINICAL USE
    --------------------------------- */

    conditions: [
        "dry cough",
        "acute cough",
        "cough due to minor throat irritation",
        "cough due to minor bronchial irritation"
    ],

    condition:
        "Dry Cough · Acute Cough",

    route:
        "Oral",

    dosageForms: [
        "oral liquid",
        "oral solution"
    ],

    commonPediatricConcentrations: [
        "15 mg/5 mL"
    ],

    indications:
        "Temporary relief of cough due to minor throat and bronchial irritation, such as may occur with the common cold or inhaled irritants.",


    /* ---------------------------------
       MECHANISM OF ACTION
    --------------------------------- */

    moa:
        "Dextromethorphan is a centrally acting antitussive that suppresses the cough reflex through effects on the central nervous system.",


    /* ---------------------------------
       PEDIATRIC INFORMATION
    --------------------------------- */

    pediatric:
        "The verified pediatric oral-liquid labeling supports use in children 6 years and older for the referenced 15 mg/5 mL formulation. Children younger than 6 years should not receive this referenced OTC formulation.",


    /* ---------------------------------
       DOSING
       AGE-BASED
    --------------------------------- */

    dosing: {

        type:
            "fixed_age_dose",

        calculatorReady:
            false,

        configured:
            false,

        route:
            "oral",

        concentration:
            "15 mg/5 mL",

        ageBasedDosing: [

            {

                minimumAgeYears:
                    6,

                maximumAgeYears:
                    12,

                doseMg:
                    15,

                doseMl:
                    5,

                frequencyText:
                    "Every 6–8 hours as needed",

                maximumDosesPer24Hours:
                    4

            },

            {

                minimumAgeYears:
                    12,

                doseMg:
                    30,

                doseMl:
                    10,

                frequencyText:
                    "Every 6–8 hours as needed",

                maximumDosesPer24Hours:
                    4

            }

        ]

    },


    indicationSpecific:
        true,


    /* ---------------------------------
       CONTRAINDICATIONS
    --------------------------------- */

    contraindications: [

        "Use with monoamine oxidase inhibitors (MAOIs)",

        "Use within 14 days of stopping an MAOI",

        "Known hypersensitivity to dextromethorphan or product components"

    ],


    /* ---------------------------------
       PRECAUTIONS
    --------------------------------- */

    precautions: [

        "Persistent or chronic cough",

        "Cough associated with asthma",

        "Cough with excessive mucus",

        "Potential interaction with serotonergic medicines",

        "Potential misuse or overdose",

        "Do not exceed the recommended dose",

        "Persistent cough requires medical evaluation"

    ],


    /* ---------------------------------
       ADVERSE EFFECTS
    --------------------------------- */

    adverseEffects: [

        "Drowsiness",

        "Dizziness",

        "Nausea",

        "Vomiting",

        "Gastrointestinal discomfort",

        "Excitability",

        "Confusion in overdose",

        "Respiratory depression in severe overdose"

    ],


    /* ---------------------------------
       IMPORTANT NOTES
    --------------------------------- */

    notes:
        "Dextromethorphan is intended for temporary symptomatic relief of dry cough. It should not routinely be used for a productive cough with significant mucus. For the referenced 15 mg/5 mL formulation, children 6–11 years receive 5 mL every 6–8 hours as needed, while patients 12 years and older receive 10 mL every 6–8 hours as needed. Do not exceed 4 doses in 24 hours. Persistent or chronic cough requires clinical assessment.",


    /* ---------------------------------
       REFERENCES
    --------------------------------- */

    references: [

        {
            organization:
                "U.S. National Library of Medicine",

            title:
                "DailyMed - Dextromethorphan Hydrobromide Liquid",

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=13ae4c67-a3fe-440c-91b8-c9412626c3cd"
        }

    ]

},


/* =========================================
   GUAIFENESIN
   WET / PRODUCTIVE COUGH
========================================= */

{
    id:
        "guaifenesin",

    genericName:
        "Guaifenesin",

    name:
        "Guaifenesin",

    brandNames: [],


    /* ---------------------------------
       CLASSIFICATION
    --------------------------------- */

    drugClass: [
        "Expectorant"
    ],

    class:
        "Expectorant",


    /* ---------------------------------
       COUGH CLASSIFICATION
    --------------------------------- */

    coughType: [
        "wet",
        "productive"
    ],

    coughCategory:
        "Wet / Productive Cough",

    therapeuticRole:
        "Expectorant",


    /* ---------------------------------
       CLINICAL USE
    --------------------------------- */

    conditions: [
        "wet cough",
        "productive cough",
        "chest congestion",
        "thick respiratory mucus"
    ],

    condition:
        "Wet / Productive Cough · Chest Congestion",

    route:
        "Oral",

    dosageForms: [
        "oral solution",
        "oral liquid"
    ],

    commonPediatricConcentrations: [
        "100 mg/5 mL"
    ],

    indications:
        "Helps loosen phlegm and thin bronchial secretions to make coughs more productive.",


    /* ---------------------------------
       MECHANISM OF ACTION
    --------------------------------- */

    moa:
        "Guaifenesin is an expectorant that increases the volume and reduces the viscosity of respiratory secretions, facilitating mucus clearance through coughing.",


    /* ---------------------------------
       PEDIATRIC INFORMATION
    --------------------------------- */

    pediatric:
        "The verified oral-liquid labeling provides age-based dosing for children 4 years and older for the referenced 100 mg/5 mL formulation.",


    /* ---------------------------------
       DOSING
       AGE-BASED
    --------------------------------- */

    dosing: {

        type:
            "fixed_age_dose",

        calculatorReady:
            false,

        configured:
            false,

        route:
            "oral",

        concentration:
            "100 mg/5 mL",

        ageBasedDosing: [

            {

                minimumAgeYears:
                    4,

                maximumAgeYears:
                    6,

                doseRangeMl:
                    "2.5–5",

                doseRangeMg:
                    "50–100",

                frequencyText:
                    "Every 4 hours as needed",

                maximumDosesPer24Hours:
                    6

            },

            {

                minimumAgeYears:
                    6,

                maximumAgeYears:
                    12,

                doseRangeMl:
                    "5–10",

                doseRangeMg:
                    "100–200",

                frequencyText:
                    "Every 4 hours as needed",

                maximumDosesPer24Hours:
                    6

            },

            {

                minimumAgeYears:
                    12,

                doseRangeMl:
                    "10–20",

                doseRangeMg:
                    "200–400",

                frequencyText:
                    "Every 4 hours as needed",

                maximumDosesPer24Hours:
                    6

            }

        ]

    },


    indicationSpecific:
        true,


    /* ---------------------------------
       CONTRAINDICATIONS
    --------------------------------- */

    contraindications: [

        "Known hypersensitivity to guaifenesin or product components"

    ],


    /* ---------------------------------
       PRECAUTIONS
    --------------------------------- */

    precautions: [

        "Persistent or chronic cough",

        "Cough associated with asthma",

        "Cough requiring medical assessment",

        "Persistent cough lasting more than 7 days",

        "Cough associated with fever, rash or persistent headache",

        "Do not exceed the recommended dose"

    ],


    /* ---------------------------------
       ADVERSE EFFECTS
    --------------------------------- */

    adverseEffects: [

        "Nausea",

        "Vomiting",

        "Stomach discomfort",

        "Dizziness",

        "Headache"

    ],


    /* ---------------------------------
       IMPORTANT NOTES
    --------------------------------- */

    notes:
        "Guaifenesin is an expectorant intended for productive cough and chest congestion associated with mucus. For the referenced 100 mg/5 mL formulation, children 4–<6 years receive 2.5–5 mL every 4 hours, children 6–<12 years receive 5–10 mL every 4 hours, and patients 12 years and older receive 10–20 mL every 4 hours. Do not exceed 6 doses in 24 hours. It should not be treated as a cough suppressant.",


    /* ---------------------------------
       REFERENCES
    --------------------------------- */

    references: [

        {
            organization:
                "U.S. National Library of Medicine",

            title:
                "DailyMed - Guaifenesin Liquid",

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fd35036c-b722-48a3-85fd-60471beb6e74"
        },

        {
            organization:
                "U.S. National Library of Medicine",

            title:
                "Children's Guaifenesin Oral Solution",

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6ab51aca-4ee8-401b-a0db-746dcde92517"
        }

    ]

},
/* =========================================
   DEXTROMETHORPHAN + GUAIFENESIN
========================================= */

{

    id:
        "dextromethorphan-guaifenesin",

    genericName:
        "Dextromethorphan Hydrobromide + Guaifenesin",

    name:
        "Dextromethorphan + Guaifenesin",

    brandNames: [],


    /* ---------------------------------
       CLASSIFICATION
    --------------------------------- */

    drugClass: [
        "Antitussive",
        "Expectorant",
        "Combination cough medicine"
    ],

    class:
        "Antitussive · Expectorant",


    /* ---------------------------------
       CLINICAL USE
    --------------------------------- */

    conditions: [
        "acute cough",
        "chest congestion",
        "cough due to minor throat irritation",
        "cough due to minor bronchial irritation"
    ],

    condition:
        "Cough · Chest Congestion",

    route:
        "Oral",

    dosageForms: [
        "oral liquid"
    ],

    commonPediatricConcentrations: [
        "Dextromethorphan HBr 5 mg/5 mL + Guaifenesin 100 mg/5 mL"
    ],


    indications:
        "Temporarily relieves cough due to minor throat and bronchial irritation while helping loosen phlegm and thin bronchial secretions.",


    /* ---------------------------------
       MECHANISM OF ACTION
    --------------------------------- */

    moa:
        "Dextromethorphan suppresses the cough reflex centrally, while guaifenesin helps loosen and thin respiratory mucus to facilitate productive coughing.",


    /* ---------------------------------
       PEDIATRIC INFORMATION
    --------------------------------- */

    pediatric:
        "The verified pediatric oral-liquid formulation is labeled for children 4 years and older. It should not be used for chronic cough or cough associated with asthma without medical assessment.",


    /* ---------------------------------
       DOSING
    ---------------------------------

       Source provides age-based dosing.

       Do NOT convert to mg/kg.
    --------------------------------- */

    dosing: {

        type:
            "fixed_age_dose",

        calculatorReady:
            false,

        configured:
            false,

        route:
            "oral",

        concentration:
            "Dextromethorphan HBr 5 mg/5 mL + Guaifenesin 100 mg/5 mL",

        ageBasedDosing: [

            {

                minimumAgeYears:
                    4,

                maximumAgeYears:
                    6,

                doseMl:
                    2.5,

                dextromethorphanMg:
                    2.5,

                guaifenesinMg:
                    50,

                frequencyText:
                    "Every 4 hours as needed",

                maximumDosesPer24Hours:
                    6

            },

            {

                minimumAgeYears:
                    6,

                maximumAgeYears:
                    12,

                doseMl:
                    5,

                dextromethorphanMg:
                    5,

                guaifenesinMg:
                    100,

                frequencyText:
                    "Every 4 hours as needed",

                maximumDosesPer24Hours:
                    6

            }

        ]

    },


    indicationSpecific:
        true,


    /* ---------------------------------
       CONTRAINDICATIONS
    --------------------------------- */

    contraindications: [

        "Use with monoamine oxidase inhibitors",

        "Use within 14 days of stopping an MAOI",

        "Known hypersensitivity to either active ingredient"

    ],


    /* ---------------------------------
       PRECAUTIONS
    --------------------------------- */

    precautions: [

        "Persistent or chronic cough",

        "Cough associated with asthma",

        "Cough with excessive mucus",

        "Potential serotonergic drug interactions",

        "Do not exceed recommended dose",

        "Persistent cough requires medical assessment",

        "Use caution with other medicines containing dextromethorphan or guaifenesin"

    ],


    /* ---------------------------------
       ADVERSE EFFECTS
    --------------------------------- */

    adverseEffects: [

        "Drowsiness",

        "Dizziness",

        "Nausea",

        "Vomiting",

        "Stomach discomfort",

        "Excitability",

        "Headache"

    ],


    /* ---------------------------------
       IMPORTANT NOTES
    --------------------------------- */

    notes:
        "Each 5 mL contains dextromethorphan HBr 5 mg and guaifenesin 100 mg. Children 4–<6 years receive 2.5–5 mL every 4 hours, while children 6–<12 years receive 5–10 mL every 4 hours, according to the verified product labeling. Do not exceed 6 doses in 24 hours. The product is intended for temporary symptomatic relief and should not be used to mask a persistent or chronic cough, including cough associated with asthma, without medical assessment.",


    /* ---------------------------------
       REFERENCES
    --------------------------------- */

    references: [

        {

            organization:
                "U.S. National Library of Medicine",

            title:
                "DailyMed - Children's Cough Relief: Dextromethorphan HBr + Guaifenesin",

            year:
                2025,

            url:
                "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=975e157a-8f8d-41ad-b55b-9f9100188ccd"

        },

        {

            organization:
                "U.S. National Library of Medicine",

            title:
                "DailyMed - Children's Mucus and Cough Relief",

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=125eeb3d-0ee2-45bb-81c0-4ca699979886"

        }

    ]

}
/* =========================================
   RESPIRATORY SYSTEM
   COUGH — WET / PRODUCTIVE COUGH

   MUCOLYTICS
   Pediatric Oral-Liquid Medicines ONLY
========================================= */


/* =========================================
   CARBOCISTEINE
========================================= */

{

    id:
        "carbocisteine",

    genericName:
        "Carbocisteine",

    name:
        "Carbocisteine",

    brandNames: [],


    /* ---------------------------------
       CLASSIFICATION
    --------------------------------- */

    drugClass: [
        "Mucolytic",
        "Expectorant"
    ],

    class:
        "Mucolytic · Expectorant",


    /* ---------------------------------
       COUGH CLASSIFICATION
    --------------------------------- */

    coughType: [
        "wet",
        "productive"
    ],

    coughCategory:
        "Wet / Productive Cough",

    therapeuticRole:
        "Mucolytic",


    /* ---------------------------------
       CLINICAL USE
    --------------------------------- */

    conditions: [
        "wet cough",
        "productive cough",
        "viscous respiratory secretions",
        "chest congestion"
    ],

    condition:
        "Wet / Productive Cough · Thick Respiratory Secretions",

    route:
        "Oral",

    dosageForms: [
        "oral solution",
        "syrup"
    ],

    commonPediatricConcentrations: [
        "250 mg/5 mL"
    ],

    indications:
        "Used as a mucolytic to assist the management of respiratory disorders associated with excessive or viscous mucus and to facilitate expectoration.",


    /* ---------------------------------
       MECHANISM OF ACTION
    --------------------------------- */

    moa:
        "Carbocisteine modifies the composition and viscosity of respiratory mucus, helping restore normal mucus properties and facilitating expectoration.",


    /* ---------------------------------
       PEDIATRIC INFORMATION
    --------------------------------- */

    pediatric:
        "The verified 250 mg/5 mL oral solution provides age-based pediatric dosing for children 2–12 years. The exact dose depends on age and the specific formulation.",


    /* ---------------------------------
       DOSING
    ---------------------------------

       AGE-BASED REGIMEN

       Do NOT convert to mg/kg.
    --------------------------------- */

    dosing: {

        type:
            "fixed_age_dose",

        calculatorReady:
            false,

        configured:
            false,

        route:
            "oral",

        concentration:
            "250 mg/5 mL",

        ageBasedDosing: [

            {

                minimumAgeYears:
                    2,

                maximumAgeYears:
                    5,

                doseRangeMl:
                    "1.25–2.5",

                doseRangeMg:
                    "62.5–125",

                frequencyText:
                    "4 times daily",

                frequencyPerDay:
                    4

            },

            {

                minimumAgeYears:
                    5,

                maximumAgeYears:
                    12,

                doseMl:
                    5,

                doseMg:
                    250,

                frequencyText:
                    "3 times daily",

                frequencyPerDay:
                    3

            }

        ]

    },


    indicationSpecific:
        false,


    /* ---------------------------------
       CONTRAINDICATIONS
    --------------------------------- */

    contraindications: [

        "Known hypersensitivity to carbocisteine",

        "Active peptic ulceration"

    ],


    /* ---------------------------------
       PRECAUTIONS
    --------------------------------- */

    precautions: [

        "History of peptic ulcer disease",

        "Gastrointestinal irritation",

        "Persistent or unexplained cough",

        "Respiratory distress",

        "Cough associated with significant wheezing or shortness of breath",

        "Ensure adequate hydration when clinically appropriate"

    ],


    /* ---------------------------------
       ADVERSE EFFECTS
    --------------------------------- */

    adverseEffects: [

        "Nausea",

        "Vomiting",

        "Diarrhoea",

        "Abdominal discomfort",

        "Gastrointestinal irritation",

        "Skin rash",

        "Hypersensitivity reactions"

    ],


    /* ---------------------------------
       IMPORTANT NOTES
    --------------------------------- */

    notes:
        "Carbocisteine is intended for cough associated with excessive or viscous respiratory secretions. The verified 250 mg/5 mL oral solution provides 1.25–2.5 mL four times daily for children 2–5 years and 5 mL three times daily for children 5–12 years. The dosing is age-based and should not be converted to a mg/kg regimen.",


    /* ---------------------------------
       REFERENCES
    --------------------------------- */

    references: [

        {

            organization:
                "electronic Medicines Compendium",

            title:
                "Carbocisteine 250 mg/5 mL Oral Solution — Summary of Product Characteristics",

            url:
                "https://www.medicines.org.uk/emc/product/13333/smpc"

        },

        {

            organization:
                "electronic Medicines Compendium",

            title:
                "Carbocisteine 250 mg/5 mL Sugar-Free Oral Solution — Summary of Product Characteristics",

            url:
                "https://www.medicines.org.uk/emc/product/13091/smpc"

        }

    ]

},


/* =========================================
   BROMHEXINE
========================================= */

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


    /* ---------------------------------
       CLASSIFICATION
    --------------------------------- */

    drugClass: [
        "Mucolytic",
        "Expectorant"
    ],

    class:
        "Mucolytic · Expectorant",


    /* ---------------------------------
       COUGH CLASSIFICATION
    --------------------------------- */

    coughType: [
        "wet",
        "productive"
    ],

    coughCategory:
        "Wet / Productive Cough",

    therapeuticRole:
        "Mucolytic",


    /* ---------------------------------
       CLINICAL USE
    --------------------------------- */

    conditions: [
        "wet cough",
        "productive cough",
        "viscous mucus",
        "chesty cough",
        "bronchitis-associated mucus"
    ],

    condition:
        "Wet / Productive Cough · Viscous Mucus",

    route:
        "Oral",

    dosageForms: [
        "oral solution",
        "syrup"
    ],

    commonPediatricConcentrations: [
        "4 mg/5 mL"
    ],

    indications:
        "Used as a mucolytic to assist the management of respiratory conditions associated with thick or viscous mucus and productive cough.",


    /* ---------------------------------
       MECHANISM OF ACTION
    --------------------------------- */

    moa:
        "Bromhexine is a mucolytic that reduces the viscosity of bronchial secretions and facilitates mucus transport and expectoration.",


    /* ---------------------------------
       PEDIATRIC INFORMATION
    --------------------------------- */

    pediatric:
        "The verified Bromhexine 4 mg/5 mL oral solution provides age-based dosing for children 2–12 years. Children 2–5 years should receive the medicine under appropriate medical supervision according to the referenced product information.",


    /* ---------------------------------
       DOSING
    ---------------------------------

       AGE-BASED REGIMEN

       Do NOT convert to mg/kg.
    --------------------------------- */

    dosing: {

        type:
            "fixed_age_dose",

        calculatorReady:
            false,

        configured:
            false,

        route:
            "oral",

        concentration:
            "4 mg/5 mL",

        ageBasedDosing: [

            {

                minimumAgeYears:
                    2,

                maximumAgeYears:
                    5,

                doseMl:
                    5,

                doseMg:
                    4,

                frequencyText:
                    "Twice daily",

                frequencyPerDay:
                    2,

                supervision:
                    "medical supervision recommended"

            },

            {

                minimumAgeYears:
                    5,

                maximumAgeYears:
                    12,

                doseMl:
                    5,

                doseMg:
                    4,

                frequencyText:
                    "4 times daily",

                frequencyPerDay:
                    4

            }

        ]

    },


    indicationSpecific:
        false,


    /* ---------------------------------
       CONTRAINDICATIONS
    --------------------------------- */

    contraindications: [

        "Known hypersensitivity to bromhexine",

        "Hypersensitivity to any component of the formulation"

    ],


    /* ---------------------------------
       PRECAUTIONS
    --------------------------------- */

    precautions: [

        "History of peptic ulcer disease",

        "Gastrointestinal irritation",

        "Persistent or worsening respiratory symptoms",

        "Difficulty expectorating increased secretions",

        "History of severe skin reactions",

        "Stop treatment and seek medical advice if progressive skin rash or mucosal lesions develop"

    ],


    /* ---------------------------------
       ADVERSE EFFECTS
    --------------------------------- */

    adverseEffects: [

        "Nausea",

        "Vomiting",

        "Abdominal discomfort",

        "Diarrhoea",

        "Skin rash",

        "Hypersensitivity reactions",

        "Rare severe cutaneous adverse reactions"

    ],


    /* ---------------------------------
       IMPORTANT NOTES
    --------------------------------- */

    notes:
        "Bromhexine liquefies bronchial secretions and may increase the flow of mucus, facilitating expectoration. The verified Bisolvon 4 mg/5 mL oral solution provides 5 mL twice daily for children 2–5 years and 5 mL four times daily for children over 5 to 12 years. Children 2–5 years should receive the product according to medical supervision. Do not confuse oral liquid formulations with tablets or other dosage forms.",


    /* ---------------------------------
       REFERENCES
    --------------------------------- */

    references: [

        {

            organization:
                "Health Products Regulatory Authority",

            title:
                "Bisolvon 4 mg/5 mL Oral Solution — Summary of Product Characteristics",

            year:
                2023,

            url:
                "https://www.hpra.ie/img/uploaded/swedocuments/Licence_PA23180-015-001_15112023155448.pdf"

        },

        {

            organization:
                "Boehringer Ingelheim",

            title:
                "Bisolvon Kids Product Information",

            url:
                "https://www.bisolvon.co.id/-/media/ems/conditions/respiratory/brands/bisolvon-id/prodotti/pdf/updated_product_pdf/bisolvon%20kids%20product%20info.pdf"

        }

    ]

},


/* =========================================
   ACETYLCYSTEINE
========================================= */

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


    /* ---------------------------------
       CLASSIFICATION
    --------------------------------- */

    drugClass: [
        "Mucolytic"
    ],

    class:
        "Mucolytic",


    /* ---------------------------------
       COUGH CLASSIFICATION
    --------------------------------- */

    coughType: [
        "wet",
        "productive"
    ],

    coughCategory:
        "Wet / Productive Cough",

    therapeuticRole:
        "Mucolytic",


    /* ---------------------------------
       CLINICAL USE
    --------------------------------- */

    conditions: [
        "wet cough",
        "productive cough",
        "thick mucus",
        "viscous respiratory secretions",
        "mucopurulent respiratory secretions"
    ],

    condition:
        "Wet / Productive Cough · Thick / Viscous Mucus",

    route:
        "Oral",

    dosageForms: [
        "oral syrup"
    ],

    commonPediatricConcentrations: [
        "200 mg/5 mL"
    ],

    indications:
        "Mucolytic treatment used to reduce the viscosity of thick respiratory secretions and facilitate expectoration.",


    /* ---------------------------------
       MECHANISM OF ACTION
    --------------------------------- */

    moa:
        "Acetylcysteine is a mucolytic that breaks disulfide bonds within mucoprotein complexes, reducing mucus viscosity and facilitating clearance of thick and viscous secretions.",


    /* ---------------------------------
       PEDIATRIC INFORMATION
    --------------------------------- */

    pediatric:
        "The referenced pediatric 4% acetylcysteine syrup contains 200 mg/5 mL. The product information provides age-based dosing for pediatric mucolytic use. Mucolytics should not routinely be used in children younger than 2 years because of limited ability to clear increased airway secretions.",


    /* ---------------------------------
       DOSING
    ---------------------------------

       PRODUCT-SPECIFIC AGE-BASED REGIMEN

       Do NOT convert to mg/kg.
    --------------------------------- */

    dosing: {

        type:
            "fixed_age_dose",

        calculatorReady:
            false,

        configured:
            false,

        route:
            "oral",

        concentration:
            "200 mg/5 mL",

        ageBasedDosing: [

            {

                minimumAgeYears:
                    2,

                maximumAgeYears:
                    7,

                doseMl:
                    5,

                doseMg:
                    200,

                frequencyText:
                    "Twice daily",

                frequencyPerDay:
                    2,

                totalDailyDoseMg:
                    400

            },

            {

                minimumAgeYears:
                    7,

                doseMl:
                    5,

                doseMg:
                    200,

                frequencyText:
                    "3 times daily",

                frequencyPerDay:
                    3,

                totalDailyDoseMg:
                    600

            }

        ]

    },


    indicationSpecific:
        false,


    /* ---------------------------------
       CONTRAINDICATIONS
    --------------------------------- */

    contraindications: [

        "Known hypersensitivity to acetylcysteine",

        "Product-specific contraindications related to excipients"

    ],


    /* ---------------------------------
       PRECAUTIONS
    --------------------------------- */

    precautions: [

        "Children younger than 2 years",

        "Bronchial asthma",

        "Bronchospasm",

        "History of peptic ulcer disease",

        "Inability to expectorate increased secretions",

        "Treatment may initially increase the volume of liquefied bronchial secretions",

        "Adequate hydration supports mucolytic action",

        "Do not combine routinely with antitussives because suppression of the cough reflex may cause secretion retention"

    ],


    /* ---------------------------------
       ADVERSE EFFECTS
    --------------------------------- */

    adverseEffects: [

        "Nausea",

        "Vomiting",

        "Diarrhoea",

        "Abdominal discomfort",

        "Dyspepsia",

        "Skin rash",

        "Hypersensitivity reactions",

        "Bronchospasm",

        "Rare severe skin reactions"

    ],


    /* ---------------------------------
       IMPORTANT NOTES
    --------------------------------- */

    notes:
        "The referenced pediatric acetylcysteine syrup contains 200 mg/5 mL. Children 2–7 years receive 5 mL twice daily (400 mg/day), while children older than 7 years receive 5 mL three times daily (600 mg/day) according to that product information. Acetylcysteine should not be routinely administered to children under 2 years because mucolytics can increase the volume of airway secretions while young children may have limited ability to expectorate. Antitussives should not routinely be combined with acetylcysteine because suppression of the cough reflex may promote secretion retention.",


    /* ---------------------------------
       REFERENCES
    --------------------------------- */

    references: [

        {

            organization:
                "Ethiopian Food and Drug Authority",

            title:
                "Asist 4% Acetylcysteine — Pediatric Syrup Product Information",

            url:
                "https://efda.gov.et/wp-content/uploads/2023/09/Asist_-Acetylcysteine_-Bilim-ilac-sanayi-ve-ticaret-AS.pdf"

        },

        {

            organization:
                "electronic Medicines Compendium",

            title:
                "Acetylcysteine 200 mg Powder for Oral Solution — Summary of Product Characteristics",

            url:
                "https://www.medicines.org.uk/emc/product/13029/smpc"

        }

    ]

}
/* =========================================
   BUTAMIRATE
   DRY / NON-PRODUCTIVE COUGH
========================================= */

{
    id:
        "butamirate",

    genericName:
        "Butamirate Citrate",

    name:
        "Butamirate",

    brandNames: [],


    /* ---------------------------------
       CLASSIFICATION
    --------------------------------- */

    drugClass: [
        "Antitussive",
        "Cough suppressant"
    ],

    class:
        "Antitussive · Cough Suppressant",


    /* ---------------------------------
       COUGH CLASSIFICATION
    --------------------------------- */

    coughType: [
        "dry"
    ],

    coughCategory:
        "Dry Cough",

    therapeuticRole:
        "Antitussive",


    /* ---------------------------------
       CLINICAL USE
    --------------------------------- */

    conditions: [
        "dry cough",
        "non-productive cough",
        "irritative cough"
    ],

    condition:
        "Dry / Non-productive Cough",

    route:
        "Oral",

    dosageForms: [
        "syrup"
    ],

    commonPediatricConcentrations: [
        "7.5 mg/5 mL"
    ],

    indications:
        "Symptomatic treatment of non-productive cough.",


    /* ---------------------------------
       MECHANISM OF ACTION
    --------------------------------- */

    moa:
        "Butamirate is a non-opioid centrally acting antitussive that suppresses the cough reflex.",


    /* ---------------------------------
       PEDIATRIC INFORMATION
    --------------------------------- */

    pediatric:
        "The referenced 7.5 mg/5 mL syrup provides age-based dosing for children 4 years and older.",


    /* ---------------------------------
       DOSING
       AGE-BASED
    --------------------------------- */

    dosing: {

        type:
            "fixed_age_dose",

        calculatorReady:
            false,

        configured:
            false,

        route:
            "oral",

        concentration:
            "7.5 mg/5 mL",

        ageBasedDosing: [

            {

                minimumAgeYears:
                    4,

                maximumAgeYears:
                    6,

                doseMl:
                    5,

                doseMg:
                    7.5,

                frequencyText:
                    "3 times daily",

                frequencyPerDay:
                    3,

                maximumDailyDoseMg:
                    22.5

            },

            {

                minimumAgeYears:
                    6,

                maximumAgeYears:
                    12,

                doseMl:
                    10,

                doseMg:
                    15,

                frequencyText:
                    "3 times daily",

                frequencyPerDay:
                    3,

                maximumDailyDoseMg:
                    45

            },

            {

                minimumAgeYears:
                    12,

                doseMl:
                    15,

                doseMg:
                    22.5,

                frequencyText:
                    "3 times daily",

                frequencyPerDay:
                    3,

                maximumDailyDoseMg:
                    67.5

            }

        ]

    },


    indicationSpecific:
        false,


    /* ---------------------------------
       CONTRAINDICATIONS
    --------------------------------- */

    contraindications: [

        "Known hypersensitivity to butamirate or any component of the formulation"

    ],


    /* ---------------------------------
       PRECAUTIONS
    --------------------------------- */

    precautions: [

        "Investigate the cause of cough before prolonged antitussive treatment",

        "Do not use for prolonged periods without medical advice",

        "Persistent cough requires clinical reassessment",

        "Do not increase the dose if cough persists",

        "Avoid inappropriate use in productive cough with significant mucus"

    ],


    /* ---------------------------------
       ADVERSE EFFECTS
    --------------------------------- */

    adverseEffects: [

        "Drowsiness",

        "Dizziness",

        "Nausea",

        "Vomiting",

        "Diarrhoea",

        "Hypotension in overdose"

    ],


    /* ---------------------------------
       IMPORTANT NOTES
    --------------------------------- */

    notes:
        "Butamirate is intended for symptomatic treatment of non-productive cough. The referenced 7.5 mg/5 mL syrup provides 5 mL three times daily for children 4–6 years, 10 mL three times daily for children 6–12 years, and 15 mL three times daily for adolescents 12 years and older. Treatment should be limited to the symptomatic period, and persistent cough requires medical assessment.",


    /* ---------------------------------
       REFERENCES
    --------------------------------- */

    references: [

        {
            organization:
                "Ethiopian Food and Drug Authority",

            title:
                "Butagan 7.5 mg/5 mL Syrup — Summary of Product Characteristics",

            sourceType:
                "Official product information"
        },

        {
            organization:
                "Haleon HealthPartner",

            title:
                "Butamirate — Pediatric Posology Information",

            sourceType:
                "Manufacturer healthcare professional information"
        }

    ]

},


/* =========================================
   LEVODROPROPIZINE
   DRY / NON-PRODUCTIVE COUGH
========================================= */

{
    id:
        "levodropropizine",

    genericName:
        "Levodropropizine",

    name:
        "Levodropropizine",

    brandNames: [],


    /* ---------------------------------
       CLASSIFICATION
    --------------------------------- */

    drugClass: [
        "Antitussive",
        "Peripheral cough suppressant"
    ],

    class:
        "Antitussive · Peripheral Cough Suppressant",


    /* ---------------------------------
       COUGH CLASSIFICATION
    --------------------------------- */

    coughType: [
        "dry"
    ],

    coughCategory:
        "Dry Cough",

    therapeuticRole:
        "Antitussive",


    /* ---------------------------------
       CLINICAL USE
    --------------------------------- */

    conditions: [
        "dry cough",
        "non-productive cough",
        "irritative cough"
    ],

    condition:
        "Dry / Non-productive Cough",

    route:
        "Oral",

    dosageForms: [
        "syrup",
        "oral solution"
    ],

    commonPediatricConcentrations: [
        "30 mg/5 mL"
    ],

    indications:
        "Symptomatic treatment of non-productive cough.",


    /* ---------------------------------
       MECHANISM OF ACTION
    --------------------------------- */

    moa:
        "Levodropropizine is a peripherally acting antitussive that reduces the excitability of tracheobronchial afferent pathways involved in the cough reflex.",


    /* ---------------------------------
       PEDIATRIC INFORMATION
    --------------------------------- */

    pediatric:
        "The referenced 30 mg/5 mL oral syrup provides pediatric dosing for children older than 2 years based on body weight.",


    /* ---------------------------------
       DOSING
       mg/kg/dose
    --------------------------------- */

    dosing: {

        type:
            "mg_per_kg_per_dose",

        minDose:
            1,

        maxDose:
            1,

        frequency:
            "3 times daily",

        frequencyPerDay:
            3,

        maxDosesPer24Hours:
            3,

        maxDailyDose:
            3,

        unit:
            "mg/kg/dose",

        dailyUnit:
            "mg/kg/day",

        route:
            "oral",

        concentration:
            "30 mg/5 mL",

        minimumAgeMonths:
            24,

        underMinimumAge:
            "contraindicated",

        minimumIntervalHours:
            6,

        configured:
            true,

        calculatorReady:
            true

    },


    indicationSpecific:
        false,


    /* ---------------------------------
       CONTRAINDICATIONS
    --------------------------------- */

    contraindications: [

        "Children younger than 2 years",

        "Excessive mucus secretion with limited mucociliary function",

        "Severe hepatic impairment",

        "Known hypersensitivity to levodropropizine"

    ],


    /* ---------------------------------
       PRECAUTIONS
    --------------------------------- */

    precautions: [

        "Renal impairment",

        "Productive cough with excessive mucus",

        "Persistent cough",

        "Treatment should not normally exceed 7 days without medical advice",

        "Administer between meals according to product information",

        "Maintain at least 6 hours between doses"

    ],


    /* ---------------------------------
       ADVERSE EFFECTS
    --------------------------------- */

    adverseEffects: [

        "Drowsiness",

        "Dizziness",

        "Headache",

        "Nausea",

        "Vomiting",

        "Diarrhoea",

        "Palpitations",

        "Allergic reactions"

    ],


    /* ---------------------------------
       IMPORTANT NOTES
    --------------------------------- */

    notes:
        "Levodropropizine is intended for non-productive cough. For the referenced 30 mg/5 mL oral syrup, children older than 2 years receive 1 mg/kg per dose three times daily, with at least 6 hours between doses, for a maximum total daily dose of 3 mg/kg/day. Treatment should not exceed 7 days without medical advice. It should not be used when excessive mucus is present with limited mucociliary clearance.",


    /* ---------------------------------
       REFERENCES
    --------------------------------- */

    references: [

        {
            organization:
                "Philippine Food and Drug Administration",

            title:
                "Levodropropizine — Product Information",

            sourceType:
                "Official regulatory product information"
        },

        {
            organization:
                "Swissmedic",

            title:
                "Levocalm — Summary Report on Authorisation",

            sourceType:
                "Regulatory assessment"
        }

    ]

},


/* =========================================
   AMBROXOL
   WET / PRODUCTIVE COUGH
========================================= */

{
    id:
        "ambroxol",

    genericName:
        "Ambroxol Hydrochloride",

    name:
        "Ambroxol",

    brandNames: [],


    /* ---------------------------------
       CLASSIFICATION
    --------------------------------- */

    drugClass: [
        "Mucolytic",
        "Secretolytic",
        "Expectorant"
    ],

    class:
        "Mucolytic · Secretolytic · Expectorant",


    /* ---------------------------------
       COUGH CLASSIFICATION
    --------------------------------- */

    coughType: [
        "wet",
        "productive"
    ],

    coughCategory:
        "Wet / Productive Cough",

    therapeuticRole:
        "Mucolytic",


    /* ---------------------------------
       CLINICAL USE
    --------------------------------- */

    conditions: [
        "wet cough",
        "productive cough",
        "viscous respiratory secretions",
        "thick mucus",
        "impaired mucociliary clearance"
    ],

    condition:
        "Wet / Productive Cough · Viscous Mucus",

    route:
        "Oral",

    dosageForms: [
        "syrup",
        "oral solution"
    ],

    commonPediatricConcentrations: [
        "15 mg/5 mL"
    ],

    indications:
        "Secretolytic and expectorant treatment of respiratory disorders associated with abnormal or viscous mucus and impaired mucociliary clearance.",


    /* ---------------------------------
       MECHANISM OF ACTION
    --------------------------------- */

    moa:
        "Ambroxol reduces mucus viscosity and promotes mucociliary clearance, facilitating the transport and expectoration of respiratory secretions.",


    /* ---------------------------------
       PEDIATRIC INFORMATION
    --------------------------------- */

    pediatric:
        "For DoseCare, the conservative pediatric regimen is based on a 15 mg/5 mL oral syrup and uses children 2 years and older. The referenced pediatric source recommends 2.5 mL three times daily for children 2–5 years and 5 mL 2–3 times daily for children older than 5 years.",


    /* ---------------------------------
       DOSING
       AGE-BASED
    --------------------------------- */

    dosing: {

        type:
            "fixed_age_dose",

        calculatorReady:
            false,

        configured:
            false,

        route:
            "oral",

        concentration:
            "15 mg/5 mL",

        minimumAgeMonths:
            24,

        ageBasedDosing: [

            {

                minimumAgeYears:
                    2,

                maximumAgeYears:
                    5,

                doseMl:
                    2.5,

                doseMg:
                    7.5,

                frequencyText:
                    "3 times daily",

                frequencyPerDay:
                    3,

                totalDailyDoseMg:
                    22.5

            },

            {

                minimumAgeYears:
                    5,

                doseMl:
                    5,

                doseMg:
                    15,

                frequencyText:
                    "2–3 times daily",

                frequencyRangePerDay:
                    [
                        2,
                        3
                    ],

                totalDailyDoseMgRange:
                    "30–45"

            }

        ]

    },


    indicationSpecific:
        false,


    /* ---------------------------------
       CONTRAINDICATIONS
    --------------------------------- */

    contraindications: [

        "Known hypersensitivity to ambroxol",

        "Hypersensitivity to bromhexine or formulation components"

    ],


    /* ---------------------------------
       PRECAUTIONS
    --------------------------------- */

    precautions: [

        "Hepatic impairment",

        "Renal impairment",

        "History of peptic ulcer disease",

        "Persistent or worsening respiratory symptoms",

        "Difficulty expectorating increased secretions",

        "Do not routinely combine with antitussive cough suppressants because mucus clearance may become more difficult",

        "Stop treatment and seek medical advice if progressive skin or mucosal lesions develop"

    ],


    /* ---------------------------------
       ADVERSE EFFECTS
    --------------------------------- */

    adverseEffects: [

        "Nausea",

        "Vomiting",

        "Abdominal discomfort",

        "Diarrhoea",

        "Dyspepsia",

        "Skin rash",

        "Hypersensitivity reactions",

        "Rare severe cutaneous reactions"

    ],


    /* ---------------------------------
       IMPORTANT NOTES
    --------------------------------- */

    notes:
        "Ambroxol is a mucolytic/secretolytic medicine intended for respiratory conditions associated with viscous mucus. For DoseCare, the 15 mg/5 mL oral syrup regimen is restricted to children 2 years and older: 2.5 mL three times daily for ages 2–5 years and 5 mL 2–3 times daily for children older than 5 years according to the referenced pediatric source. Do not routinely combine mucolytics with cough suppressants when suppression of the cough reflex could impair mucus clearance.",


    /* ---------------------------------
       REFERENCES
    --------------------------------- */

    references: [

        {
            organization:
                "Asociación Española de Pediatría",

            title:
                "Pediamécum — Ambroxol",

            sourceType:
                "Pediatric professional reference"
        },

        {
            organization:
                "Ethiopian Food and Drug Authority",

            title:
                "Sekrol Pediatric Syrup 15 mg/5 mL — Summary of Product Characteristics",

            sourceType:
                "Official product information"
        }

    ]

}
/* =========================================
   CHLORPHENAMINE
   FIRST-GENERATION / SEDATING ANTIHISTAMINE
========================================= */

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


    /* ---------------------------------
       CLASSIFICATION
    --------------------------------- */

    drugClass: [
        "Antihistamine",
        "H1 receptor antagonist",
        "First-generation antihistamine"
    ],

    class:
        "First-generation H1 Antihistamine · Sedating",


    /* ---------------------------------
       ANTIHISTAMINE GENERATION
    --------------------------------- */

    antihistamineGeneration:
        "first_generation",

    sedation:
        "sedating",

    sedationLevel:
        "high",


    /* ---------------------------------
       CLINICAL USE
    --------------------------------- */

    conditions: [
        "allergic rhinitis",
        "hay fever",
        "urticaria",
        "angioedema",
        "food allergy",
        "insect bite reactions",
        "drug allergy reactions"
    ],

    condition:
        "Allergic Rhinitis · Urticaria · Allergic Conditions",

    route:
        "Oral",

    dosageForms: [
        "syrup",
        "oral solution"
    ],

    commonPediatricConcentrations: [
        "2 mg/5 mL"
    ],

    indications:
        "Symptomatic relief of allergic conditions responsive to antihistamines, including allergic rhinitis, urticaria and reactions to insect bites, foods or medicines.",


    /* ---------------------------------
       MECHANISM OF ACTION
    --------------------------------- */

    moa:
        "Chlorphenamine is a first-generation H1-receptor antagonist that reduces the effects of histamine. Because it crosses the blood-brain barrier, it can cause central nervous system sedation.",


    /* ---------------------------------
       PEDIATRIC INFORMATION
    --------------------------------- */

    pediatric:
        "The referenced 2 mg/5 mL oral syrup provides age-based dosing from 1 year of age. It is not recommended for children younger than 1 year.",


    /* ---------------------------------
       DOSING
       AGE-BASED
    --------------------------------- */

    dosing: {

        type:
            "fixed_age_dose",

        calculatorReady:
            false,

        configured:
            false,

        route:
            "oral",

        concentration:
            "2 mg/5 mL",

        ageBasedDosing: [

            {

                minimumAgeYears:
                    1,

                maximumAgeYears:
                    2,

                doseMl:
                    2.5,

                doseMg:
                    1,

                frequencyText:
                    "Twice daily",

                frequencyPerDay:
                    2,

                maximumDailyDoseMg:
                    2

            },

            {

                minimumAgeYears:
                    2,

                maximumAgeYears:
                    6,

                doseMl:
                    2.5,

                doseMg:
                    1,

                frequencyText:
                    "Every 4–6 hours as needed",

                minimumIntervalHours:
                    4,

                maximumDosesPer24Hours:
                    6,

                maximumDailyDoseMg:
                    6

            },

            {

                minimumAgeYears:
                    6,

                maximumAgeYears:
                    12,

                doseMl:
                    5,

                doseMg:
                    2,

                frequencyText:
                    "Every 4–6 hours as needed",

                minimumIntervalHours:
                    4,

                maximumDosesPer24Hours:
                    6,

                maximumDailyDoseMg:
                    12

            },

            {

                minimumAgeYears:
                    12,

                doseMl:
                    10,

                doseMg:
                    4,

                frequencyText:
                    "Every 4–6 hours as needed",

                minimumIntervalHours:
                    4,

                maximumDosesPer24Hours:
                    6,

                maximumDailyDoseMg:
                    24

            }

        ]

    },


    indicationSpecific:
        false,


    /* ---------------------------------
       CONTRAINDICATIONS
    --------------------------------- */

    contraindications: [

        "Hypersensitivity to chlorphenamine or other antihistamines",

        "Use with monoamine oxidase inhibitors or within 14 days of stopping an MAOI",

        "Premature infants or neonates",

        "Acute asthma"

    ],


    /* ---------------------------------
       PRECAUTIONS
    --------------------------------- */

    precautions: [

        "Drowsiness and sedation",

        "Epilepsy",

        "Glaucoma",

        "Urinary retention",

        "Renal impairment",

        "Hepatic impairment",

        "Cardiovascular disease",

        "Asthma",

        "Bronchitis",

        "Concurrent sedative medicines",

        "Do not combine with other antihistamine-containing cough and cold medicines"

    ],


    /* ---------------------------------
       ADVERSE EFFECTS
    --------------------------------- */

    adverseEffects: [

        "Drowsiness",

        "Sedation",

        "Dizziness",

        "Blurred vision",

        "Dry mouth",

        "Gastrointestinal disturbance",

        "Urinary retention",

        "Paradoxical excitation in children",

        "Headache"

    ],


    /* ---------------------------------
       IMPORTANT NOTES
    --------------------------------- */

    notes:
        "Chlorphenamine is a first-generation sedating antihistamine. Drowsiness and anticholinergic effects are important clinical considerations. The referenced 2 mg/5 mL syrup provides 1 mg twice daily for children 1–2 years, 1 mg every 4–6 hours for children 2–6 years, 2 mg every 4–6 hours for children 6–12 years, and 4 mg every 4–6 hours for children over 12 years. Do not exceed the product-specific maximum daily dose.",


    /* ---------------------------------
       REFERENCES
    --------------------------------- */

    references: [

        {
            organization:
                "electronic Medicines Compendium",

            title:
                "Piriton Syrup — Summary of Product Characteristics",

            url:
                "https://www.medicines.org.uk/emc/product/3928/smpc"
        },

        {
            organization:
                "electronic Medicines Compendium",

            title:
                "Boots 1 Year Plus Allergy Relief Antihistamine 2 mg/5 mL Syrup — SmPC",

            url:
                "https://www.medicines.org.uk/emc/product/3866/smpc"
        }

    ]

},
/* =========================================
   DIPHENHYDRAMINE
   FIRST-GENERATION / SEDATING ANTIHISTAMINE
========================================= */

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


    /* ---------------------------------
       CLASSIFICATION
    --------------------------------- */

    drugClass: [
        "Antihistamine",
        "H1 receptor antagonist",
        "First-generation antihistamine"
    ],

    class:
        "First-generation H1 Antihistamine · Sedating",


    /* ---------------------------------
       ANTIHISTAMINE GENERATION
    --------------------------------- */

    antihistamineGeneration:
        "first_generation",

    sedation:
        "sedating",

    sedationLevel:
        "high",


    /* ---------------------------------
       CLINICAL USE
    --------------------------------- */

    conditions: [
        "allergic rhinitis",
        "hay fever",
        "runny nose",
        "sneezing",
        "itchy eyes",
        "watery eyes",
        "itching of the nose or throat"
    ],

    condition:
        "Allergic Rhinitis · Respiratory Allergy Symptoms",

    route:
        "Oral",

    dosageForms: [
        "oral solution",
        "oral liquid"
    ],

    commonPediatricConcentrations: [
        "12.5 mg/5 mL"
    ],

    indications:
        "Temporary relief of symptoms associated with hay fever and other upper respiratory allergies, including runny nose, sneezing, and itchy or watery eyes.",


    /* ---------------------------------
       MECHANISM OF ACTION
    --------------------------------- */

    moa:
        "Diphenhydramine is a first-generation H1-receptor antagonist that blocks histamine-mediated effects. Its penetration into the central nervous system contributes to sedation.",


    /* ---------------------------------
       PEDIATRIC INFORMATION
    --------------------------------- */

    pediatric:
        "For the referenced 12.5 mg/5 mL oral solution, children under 2 years should not receive the product. Children 2–5 years should only receive it when directed by a physician. Children 6–11 years have labeled dosing of 5–10 mL every 4–6 hours.",


    /* ---------------------------------
       DOSING
       AGE-BASED
    --------------------------------- */

    dosing: {

        type:
            "fixed_age_dose",

        calculatorReady:
            false,

        configured:
            false,

        route:
            "oral",

        concentration:
            "12.5 mg/5 mL",

        ageBasedDosing: [

            {

                minimumAgeYears:
                    2,

                maximumAgeYears:
                    5,

                doseMl:
                    null,

                doseMg:
                    null,

                frequencyText:
                    "Only if directed by a physician",

                physicianDirected:
                    true

            },

            {

                minimumAgeYears:
                    6,

                maximumAgeYears:
                    12,

                doseRangeMl:
                    "5–10",

                doseRangeMg:
                    "12.5–25",

                frequencyText:
                    "Every 4–6 hours as needed",

                minimumIntervalHours:
                    4,

                maximumDosesPer24Hours:
                    6

            },

            {

                minimumAgeYears:
                    12,

                doseRangeMl:
                    "10–20",

                doseRangeMg:
                    "25–50",

                frequencyText:
                    "Every 4–6 hours as needed",

                minimumIntervalHours:
                    4,

                maximumDosesPer24Hours:
                    6

            }

        ]

    },


    indicationSpecific:
        false,


    /* ---------------------------------
       CONTRAINDICATIONS
    --------------------------------- */

    contraindications: [

        "Hypersensitivity to diphenhydramine",

        "Use with monoamine oxidase inhibitors",

        "Use for the purpose of inducing sleep in children"

    ],


    /* ---------------------------------
       PRECAUTIONS
    --------------------------------- */

    precautions: [

        "Marked drowsiness may occur",

        "Sedatives and tranquilizers may increase drowsiness",

        "Glaucoma",

        "Chronic bronchitis or other breathing problems",

        "Paradoxical excitability may occur in children",

        "Do not use with another product containing diphenhydramine",

        "Do not use to make a child sleepy"

    ],


    /* ---------------------------------
       ADVERSE EFFECTS
    --------------------------------- */

    adverseEffects: [

        "Marked drowsiness",

        "Sedation",

        "Dizziness",

        "Dry mouth",

        "Blurred vision",

        "Gastrointestinal discomfort",

        "Excitability",

        "Confusion"

    ],


    /* ---------------------------------
       IMPORTANT NOTES
    --------------------------------- */

    notes:
        "Diphenhydramine is a strongly sedating first-generation antihistamine. The referenced 12.5 mg/5 mL oral solution should not be used in children under 2 years and should only be used in children 2–5 years when directed by a physician. Children 6–11 years receive 5–10 mL every 4–6 hours, with no more than 6 doses in 24 hours. It must not be used simply to make a child sleepy.",


    /* ---------------------------------
       REFERENCES
    --------------------------------- */

    references: [

        {
            organization:
                "U.S. National Library of Medicine",

            title:
                "DailyMed — Diphenhydramine HCl Oral Solution 12.5 mg/5 mL",

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7406e4e4-3093-4cd1-80ce-93f7b6db2a87"
        }

    ]

},
/* =========================================
   HYDROXYZINE
   FIRST-GENERATION / SEDATING ANTIHISTAMINE
========================================= */

{
    id:
        "hydroxyzine",

    genericName:
        "Hydroxyzine Hydrochloride",

    name:
        "Hydroxyzine",

    brandNames: [],


    /* ---------------------------------
       CLASSIFICATION
    --------------------------------- */

    drugClass: [
        "Antihistamine",
        "H1 receptor antagonist",
        "First-generation antihistamine"
    ],

    class:
        "First-generation H1 Antihistamine · Sedating",


    /* ---------------------------------
       ANTIHISTAMINE GENERATION
    --------------------------------- */

    antihistamineGeneration:
        "first_generation",

    sedation:
        "sedating",

    sedationLevel:
        "high",


    /* ---------------------------------
       CLINICAL USE
    --------------------------------- */

    conditions: [
        "pruritus due to allergic conditions",
        "chronic urticaria",
        "atopic dermatitis",
        "contact dermatitis",
        "histamine-mediated pruritus"
    ],

    condition:
        "Allergic Pruritus · Urticaria · Dermatoses",

    route:
        "Oral",

    dosageForms: [
        "syrup",
        "oral solution"
    ],

    commonPediatricConcentrations: [
        "10 mg/5 mL"
    ],

    indications:
        "Symptomatic management of pruritus associated with allergic conditions such as chronic urticaria, atopic dermatitis and contact dermatitis, and histamine-mediated pruritus.",


    /* ---------------------------------
       MECHANISM OF ACTION
    --------------------------------- */

    moa:
        "Hydroxyzine is a first-generation H1-receptor antagonist with antihistaminic effects. It also produces central nervous system depression, contributing to its sedative effect.",


    /* ---------------------------------
       PEDIATRIC INFORMATION
    --------------------------------- */

    pediatric:
        "The referenced 10 mg/5 mL oral solution provides pediatric dosing for allergic pruritus. Children under 6 years receive 50 mg daily in divided doses, while children over 6 years receive 50–100 mg daily in divided doses.",


    /* ---------------------------------
       DOSING
       AGE-BASED
    --------------------------------- */

    dosing: {

        type:
            "fixed_daily_dose",

        calculatorReady:
            false,

        configured:
            false,

        route:
            "oral",

        concentration:
            "10 mg/5 mL",

        indication:
            "allergic_pruritus",

        ageBasedDosing: [

            {

                minimumAgeYears:
                    0,

                maximumAgeYears:
                    6,

                totalDailyDoseMg:
                    50,

                totalDailyDoseMl:
                    25,

                frequencyText:
                    "In divided doses",

                maximumDailyDoseMg:
                    50,

                maximumDailyDoseMl:
                    25

            },

            {

                minimumAgeYears:
                    6,

                totalDailyDoseRangeMg:
                    "50–100",

                totalDailyDoseRangeMl:
                    "25–50",

                frequencyText:
                    "In divided doses",

                maximumDailyDoseMg:
                    100,

                maximumDailyDoseMl:
                    50

            }

        ]

    },


    indicationSpecific:
        true,


    /* ---------------------------------
       CONTRAINDICATIONS
    --------------------------------- */

    contraindications: [

        "Known hypersensitivity to hydroxyzine",

        "Hypersensitivity to cetirizine or levocetirizine",

        "Prolonged QT interval",

        "Known long QT syndrome"

    ],


    /* ---------------------------------
       PRECAUTIONS
    --------------------------------- */

    precautions: [

        "Drowsiness and sedation",

        "Risk of QT prolongation",

        "Congenital long QT syndrome",

        "Family history of long QT syndrome",

        "Cardiovascular disease",

        "Electrolyte abnormalities",

        "Concomitant use of other QT-prolonging medicines",

        "Concomitant use of CNS depressants",

        "Renal impairment",

        "Hepatic impairment"

    ],


    /* ---------------------------------
       ADVERSE EFFECTS
    --------------------------------- */

    adverseEffects: [

        "Drowsiness",

        "Sedation",

        "Dry mouth",

        "Dizziness",

        "Headache",

        "Confusion",

        "Tremor",

        "QT prolongation",

        "Torsade de Pointes"

    ],


    /* ---------------------------------
       IMPORTANT NOTES
    --------------------------------- */

    notes:
        "Hydroxyzine is a strongly sedating first-generation antihistamine. The referenced 10 mg/5 mL oral solution is used for allergic pruritus rather than routine allergic rhinitis. For pruritus, children under 6 years receive 50 mg daily in divided doses, while children over 6 years receive 50–100 mg daily in divided doses. Hydroxyzine is contraindicated in patients with prolonged QT and requires caution with other QT-prolonging medicines.",


    /* ---------------------------------
       REFERENCES
    --------------------------------- */

    references: [

        {
            organization:
                "U.S. National Library of Medicine",

            title:
                "DailyMed — Hydroxyzine Hydrochloride Oral Solution, USP 10 mg/5 mL",

            url:
                "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0de7a377-7a8f-4119-b172-1eadb4b7e1be"
        }

    ]

},
