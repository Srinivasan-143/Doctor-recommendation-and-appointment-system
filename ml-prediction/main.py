
# main.py
from joblib import dump
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

class DiseasePrediction:
    def __init__(self, model_name):
        self.train_path = "./dataset/training_data.csv"
        self.test_path = "./dataset/test_data.csv"
        self.model_save_path = f"./saved_model/{model_name}.joblib"
        self.random_state = 42
        self.model_name = model_name

        # Load datasets
        self.train_df = pd.read_csv(self.train_path)
        self.test_df = pd.read_csv(self.test_path)

        # Drop unnamed columns
        self.train_df = self.train_df.loc[:, ~self.train_df.columns.str.contains('^Unnamed')]
        self.test_df = self.test_df.loc[:, ~self.test_df.columns.str.contains('^Unnamed')]

        # Features and labels
        self.train_features = self.train_df.drop(columns=["prognosis"]).fillna(0)
        self.train_labels = self.train_df["prognosis"]

        self.test_features = self.test_df.drop(columns=["prognosis"]).fillna(0)
        self.test_labels = self.test_df["prognosis"]

    def select_model(self):
        if self.model_name == "decision_tree":
            return DecisionTreeClassifier(criterion="entropy", random_state=self.random_state)
        elif self.model_name == "random_forest":
            return RandomForestClassifier(n_estimators=100, random_state=self.random_state)
        else:
            raise ValueError("Unknown model name")
            
    def train_model(self):
        # Train/validation split
        X_train, X_val, y_train, y_val = train_test_split(
            self.train_features, self.train_labels,
            test_size=0.2, random_state=self.random_state
        )

        clf = self.select_model()
        clf.fit(X_train, y_train)

        # Validation accuracy
        val_preds = clf.predict(X_val)
        val_accuracy = accuracy_score(y_val, val_preds)

        # Test accuracy
        test_preds = clf.predict(self.test_features)
        test_accuracy = accuracy_score(self.test_labels, test_preds)

        print(f"{self.model_name} Validation Accuracy:", val_accuracy)
        print(f"{self.model_name} Test Accuracy:", test_accuracy)
        print(classification_report(self.test_labels, test_preds))

        # Save model + metrics
        dump({
            "model": clf,
            "validation_accuracy": val_accuracy,
            "test_accuracy": test_accuracy
        }, self.model_save_path)

if __name__ == "__main__":
    for model in ["decision_tree", "random_forest"]:
        dp = DiseasePrediction(model_name=model)
        dp.train_model()


