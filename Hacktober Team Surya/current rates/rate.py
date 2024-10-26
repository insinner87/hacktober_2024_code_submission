import requests
import json

api_key = "579b464db66ec23bdd0000018aed7e44a82b46275191b57a39d212e1"
url = f"https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key={api_key}&format=json&limit=100"

all_records = []
offset = 0

while True:
    response = requests.get(f"{url}&offset={offset}")
    data = response.json()

    if "records" in data and data["records"]:
        all_records.extend(data["records"])
        offset += 100
    else:
        break

with open("data.json", "w") as file:
    json.dump(all_records, file, indent=4)

print(f"Saved {len(all_records)} records to data.json")
