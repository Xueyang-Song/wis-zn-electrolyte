| Machine     |               | Learning |     |             |     | Analysis |             | of         | Organic |     |               | Co-Solvents |     |     |     |
| ----------- | ------------- | -------- | --- | ----------- | --- | -------- | ----------- | ---------- | ------- | --- | ------------- | ----------- | --- | --- | --- |
| for         | Water-in-Salt |          |     |             |     | Zinc-Ion |             | Battery    |         |     | Electrolytes: |             |     |     | A   |
| Cross-Study |               |          |     | Dataset     |     |          | and         | Predictive |         |     |               | Framework   |     |     |     |
|             |               |          |     |             |     |          | Xueyang     | Song*      |         |     |               |             |     |     |     |
|             |               |          |     | Independent |     |          | Researcher, | Vancouver, | Canada  |     |               |             |     |     |     |
songxueyang@proton.me
Abstract—ElectrolytedesignforaqueousZnbatteriesisstill glycerol, and phosphate esters, each offering distinct ad-
| largely empirical. |                | We assembled |              | a cross-study |      | dataset        | of 108 |          |                |     |      |           |           |     |        |
| ------------------ | -------------- | ------------ | ------------ | ------------- | ---- | -------------- | ------ | -------- | -------------- | --- | ---- | --------- | --------- | --- | ------ |
|                    |                |              |              |               |      |                |        | vantages | in suppressing |     | HER, | modifying | solvation |     | struc- |
| water-in-salt      | Zn electrolyte |              | formulations |               | from | 63 open-access |        |          |                |     |      |           |           |     |        |
tures,orenhancingZnplating/strippingreversibility[11]–
| papers published |     | between | 2018 | and early | 2026, | and | bench- |     |     |     |     |     |     |     |     |
| ---------------- | --- | ------- | ---- | --------- | ----- | --- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
[13].
| marked | four regressors | using | 23  | molecular, | physicochemical, |     |     |     |     |     |     |     |     |     |     |
| ------ | --------------- | ----- | --- | ---------- | ---------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
and formulation features. Random Forest gave the best cycle- Co-solvent selection remains empirical. Luo et al. [14]
lifespan model with cross-validated R2 = 0.51 (p = 0.01), showed that donor number correlates with additive effec-
while XGBoost performed best for ionic conductivity with R2 ≈0.6
|           |      |             |     |                  |     |          |     | tiveness | in dilute | aqueous | electrolytes, |     | reaching |     |     |
| --------- | ---- | ----------- | --- | ---------------- | --- | -------- | --- | -------- | --------- | ------- | ------------- | --- | -------- | --- | --- |
| R2 = 0.30 | (p = | 0.01). SHAP |
