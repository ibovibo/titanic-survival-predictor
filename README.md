# Titanic Survival Predictor

A machine learning model that estimates a passenger's probability of
surviving the Titanic disaster, based on the classic Kaggle dataset.

## Result

**82.3% accuracy** (mean of 5-fold cross-validation)

Individual fold scores: `[0.792, 0.820, 0.848, 0.792, 0.864]`

For context, the majority-class baseline (predicting that everyone died)
scores about 61.6% on this dataset, so the model adds roughly 21 points
over guessing.

## Approach

**Model:** Random Forest Classifier with `max_depth=5`

The depth limit is deliberate. With the default unlimited depth, the model
scored 98% on training data but only 82% on the test set — a 16-point gap
indicating it had memorized individual passengers rather than learning
generalizable patterns. Capping the depth closed that gap to about 4 points
and improved test accuracy.

**Preprocessing:**
- `Sex` encoded as 0 / 1
- `Embarked` encoded ordinally; 2 rows with missing values dropped
- `Age` missing values (~20% of the dataset) filled with the column mean
- `Name`, `Ticket`, `Cabin`, `PassengerId` dropped

## Feature Importance

| Feature  | Importance |
|----------|-----------|
| Sex      | 0.433     |
| Fare     | 0.173     |
| Pclass   | 0.158     |
| Age      | 0.108     |
| SibSp    | 0.054     |
| Parch    | 0.038     |
| Embarked | 0.037     |

`Sex` alone accounts for more than 40% of the model's decision-making,
which matches the historical "women and children first" evacuation policy.
`Fare` and `Pclass` together contribute another 33% — both are proxies for
passenger wealth.

One caveat worth noting: impurity-based importance scores favor
high-cardinality features. `Fare` takes hundreds of distinct values while
`Sex` takes only two, so `Sex` is likely even more dominant than the table
suggests.

## Known Limitations

- **Ordinal encoding of `Embarked`** imposes an artificial ordering on
  what is a purely categorical variable. Changing the assigned numbers
  measurably shifts the model's score, which confirms the encoding is
  affecting how the tree can split. One-hot encoding would be more correct.
- **Mean imputation for `Age`** assigns the same value to roughly a fifth
  of the dataset, which likely weakens the model's ability to detect the
  "children first" pattern. Imputing by passenger class or title would
  preserve more signal.
- Tree-based models cannot extrapolate beyond the range seen in training,
  so unusually high `Fare` inputs are effectively capped.

## Usage

```bash
pip install -r requirements.txt
python train_model.py    # trains and saves model.pkl
python predict.py        # interactive prediction
```

`train_model.py` only needs to be run once. `predict.py` loads the saved
model, so it starts instantly.

## Data

[Kaggle — Titanic: Machine Learning from Disaster](https://www.kaggle.com/competitions/titanic)