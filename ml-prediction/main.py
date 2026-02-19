# Import Dependencies
'''from joblib import dump, load
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.naive_bayes import MultinomialNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
import seaborn as sn
import matplotlib.pyplot as plt


class DiseasePrediction:
    def __init__(self, model_name=None):
        # Hardcoded config values (no YAML needed)
        self.verbose = True
        self.train_path = "./dataset/training_data.csv"
        self.test_path = "./dataset/test_data.csv"
        self.validation_size = 0.2
        self.random_state = 42
        self.model_save_path = "./saved_model/"

        # Load Training Data
        self.train_features, self.train_labels, self.train_df = self._load_train_dataset()
        # Load Test Data
        self.test_features, self.test_labels, self.test_df = self._load_test_dataset()
        # Feature Correlation (fixed to drop prognosis)
        self._feature_correlation(data_frame=self.train_df, show_fig=False)
        # Model Definition
        self.model_name = model_name

    def _load_train_dataset(self):
        df_train = pd.read_csv(self.train_path)
        cols = df_train.columns[:-2]   # symptoms only
        train_features = df_train[cols]
        train_labels = df_train['prognosis']

        if self.verbose:
            print("Training Data:", df_train.shape)
        return train_features, train_labels, df_train

    def _load_test_dataset(self):
        df_test = pd.read_csv(self.test_path)
        cols = df_test.columns[:-1]
        test_features = df_test[cols]
        test_labels = df_test['prognosis']

        if self.verbose:
            print("Test Data:", df_test.shape)
        return test_features, test_labels, df_test

    def _feature_correlation(self, data_frame=None, show_fig=False):
        # Drop prognosis column before correlation
        corr = data_frame.drop(columns=["prognosis"]).corr()

        sn.heatmap(corr, square=True, annot=False, cmap="YlGnBu")
        plt.title("Feature Correlation")
        plt.tight_layout()
        if show_fig:
            plt.show()
        plt.savefig('feature_correlation.png')

    def _train_val_split(self):
        return train_test_split(
            self.train_features, self.train_labels,
            test_size=self.validation_size,
            random_state=self.random_state
        )

    def select_model(self):
        if self.model_name == 'mnb':
            return MultinomialNB()
        elif self.model_name == 'decision_tree':
            return DecisionTreeClassifier(criterion="entropy")
        elif self.model_name == 'random_forest':
            return RandomForestClassifier(n_estimators=80)
        elif self.model_name == 'gradient_boost':
            return GradientBoostingClassifier(n_estimators=100)
        else:
            raise ValueError("Unknown model name")

    def train_model(self):
        X_train, X_val, y_train, y_val = self._train_val_split()
        classifier = self.select_model()
        classifier.fit(X_train, y_train)

        y_pred = classifier.predict(X_val)
        accuracy = accuracy_score(y_val, y_pred)
        print("Validation Accuracy:", accuracy)

        dump(classifier, f"{self.model_save_path}{self.model_name}.joblib")

    def make_prediction(self, saved_model_name=None, test_data=None):
        clf = load(f"{self.model_save_path}{saved_model_name}.joblib")
        if test_data is not None:
            return clf.predict(test_data)
        else:
            result = clf.predict(self.test_features)
            accuracy = accuracy_score(self.test_labels, result)
            print("Test Accuracy:", accuracy)
            return accuracy, classification_report(self.test_labels, result)


if __name__ == "__main__":
    for model_name in ['decision_tree', 'random_forest', 'mnb', 'gradient_boost']:
        print(f"\n=== Training {model_name} ===")
        dp = DiseasePrediction(model_name=model_name)
        dp.train_model()
        test_accuracy, clf_report = dp.make_prediction(saved_model_name=model_name)
        print(f"{model_name} Test Accuracy: {test_accuracy}")
'''

# main.py
from joblib import dump
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.naive_bayes import MultinomialNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier

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
        if self.model_name == "mnb":
            return MultinomialNB()
        elif self.model_name == "decision_tree":
            return DecisionTreeClassifier(criterion="entropy", random_state=self.random_state)
        elif self.model_name == "random_forest":
            return RandomForestClassifier(n_estimators=100, random_state=self.random_state)
        elif self.model_name == "gradient_boost":
            return GradientBoostingClassifier(n_estimators=100, random_state=self.random_state)
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
    for model in ["mnb", "decision_tree", "random_forest", "gradient_boost"]:
        dp = DiseasePrediction(model_name=model)
        dp.train_model()


