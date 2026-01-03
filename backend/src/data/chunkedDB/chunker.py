import json
import os
from collections import defaultdict

# Get directory where chunker.py is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

INPUT_FILE = os.path.join(BASE_DIR, "BengaliDictionary.json")
OUTPUT_DIR = os.path.join(BASE_DIR, "bn_chunks")

os.makedirs(OUTPUT_DIR, exist_ok=True)

with open(INPUT_FILE, "r", encoding="utf-8-sig") as f:

    data = json.load(f)

# Dictionary to group entries by first Bangla letter
groups = defaultdict(list)

for entry in data:
    bn_value = entry.get("bn", "").strip()
    if not bn_value:
        continue  # skip empty or missing bn

    first_letter = bn_value[0]
    groups[first_letter].append(entry)

# Sort groups and write files
for letter in sorted(groups.keys()):
    # Sort entries inside each group by bn value
    groups[letter].sort(key=lambda x: x.get("bn", ""))

    output_path = os.path.join(OUTPUT_DIR, f"bn_{letter}.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(groups[letter], f, ensure_ascii=False, indent=4)

print("Done! JSON files created by Bangla first letter.")
