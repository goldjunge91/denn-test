#!/bin/bash
# Shebang: Weist das Betriebssystem an, das Skript mit dem Bash-Interpreter auszuführen

# JSON-Datei mit Dinosaurier-Daten
json_file="single_dinos.json"  # Variable, die den Pfad zur JSON-Datei speichert

# URL des API-Endpunkts
api_url="http://localhost:8000/dinosaur"  # Variable, die die URL des API-Endpunkts speichert

# Überprüfen, ob die JSON-Datei existiert
if [[ ! -f "$json_file" ]]; then  # Testet, ob die Datei existiert (! negiert die Bedingung)
  echo "Die Datei $json_file wurde nicht gefunden!"  # Ausgabe einer Fehlermeldung, wenn die Datei nicht existiert
  exit 1  # Beendet das Skript mit dem Statuscode 1 (Fehler)
else  # Andernfalls (wenn die Datei existiert)
  echo "JSON-Datei gefunden im Verzeichnis: $(pwd)"  # Ausgabe einer Erfolgsmeldung mit aktuellem Verzeichnis
fi

# Anzahl der Dinosaurier in der JSON-Datei ermitteln
num_dinosaurs=$(jq '. | length' "$json_file")  # jq ermittelt die Länge des JSON-Arrays, die in num_dinosaurs gespeichert wird
echo "Anzahl der Dinosaurier: $num_dinosaurs"  # Ausgabe der Anzahl der Dinosaurier

# Warten auf Benutzereingabe, bevor es weitergeht
echo "Drücken Sie die Eingabetaste, um fortzufahren..."
read -r  # Wartet auf Benutzereingabe (drücken von Enter)
sleep 3  # Wartet 3 Sekunden
echo "Weiter geht's!"

# Alle Dinosaurier durchgehen und sie einzeln posten
for (( i=0; i<$num_dinosaurs; i++ )); do  # for-Schleife, die von 0 bis zur Anzahl der Dinosaurier iteriert
  # Den einzelnen Dinosaurier als JSON-Objekt extrahieren
  dinosaur=$(jq ".[$i]" "$json_file")  # jq extrahiert das i-te Element (Dinosaurier) aus dem JSON-Array
  dinosaur_name=$(echo "$dinosaur" | jq -r '.name')  # Name des Dinosauriers extrahieren

  # Überprüfen, ob der Dinosaurier bereits existiert
  check_response=$(curl -s -o /dev/null -w "%{http_code}" -X GET "$api_url?name=$dinosaur_name")
  if [[ "$check_response" -eq 200 ]]; then
    echo "Dinosaurier $dinosaur_name bereits vorhanden. Überspringe das Einfügen."
    continue
  fi

  # POST-Anfrage senden, falls der Dinosaurier nicht existiert
  response=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d "$dinosaur" "$api_url")

  # HTTP-Statuscode überprüfen
  if [[ "$response" -eq 200 ]]; then
    echo "Dinosaurier $i ($dinosaur_name) erfolgreich gepostet."
  elif [[ "$response" -eq 409 ]]; then  # 409 Conflict - Dinosaurier möglicherweise bereits vorhanden
    echo "Dinosaurier $i ($dinosaur_name) bereits vorhanden (HTTP Status: $response)."
  else
    echo "Fehler beim Posten von Dinosaurier $i ($dinosaur_name). HTTP Status: $response"
  fi

done  # Ende der for-Schleife

echo "Alle Dinosaurier wurden gepostet!"  # Erfolgsmeldung nach dem Durchlaufen der Schleife
