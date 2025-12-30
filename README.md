# Projektbeschreibung

Aare you Safe? visualisiert aktuelle Umweltdaten der Aare in Bern. Grundlage dafür sind Wasser- und Lufttemperatur sowie die aktuelle Wassermenge. Aufgrund dessen kann eingeschätzt werden, wie sicher das Schwimmen in der Aare ist.

#### Aktuelle Daten

In Echtzeit werden Wasser- und Aussentemperatur sowie die Wassermenge pro Sekunde angezeigt. Eine hohe Wassermenge weist auf eine starke Strömung und damit auf ein erhöhtes Risiko hin. Animierte Fische verändern sich je nach Wassertemperatur und geben Hinweise darauf, welche Fischarten aktuell gefischt werden können.

#### Visuelle Indikatoren

Die Anzahl der Aare-Säcke dient als Indiz für die Wassertemperatur und symbolisiert, wie viele Menschen sich in der Aare aufhalten könnten. Eine Badewanne visualisiert zusätzlich die durchfliessende Wassermenge. Interaktive Grafiken ermöglichen den Vergleich von Wasser- und Lufttemperaturen sowie der Wassermenge.

## Learnings

JavaScript-Bibliotheken wie Chart.js erleichtern zwar die Umsetzung von komplexen Visualisierungen, wie z.B. Balken- und Areadiagramme. Gleichzeitig zeigte sich, dass spezifische Anpassungen wie responsive Charts ein vertieftes Verständnis der Bibliothek und einen genaueren Blick in die Dokumentation erfordern. Dabei haben wir gelernt, dass Responsiveness nicht nur über CSS, sondern teilweise auch direkt über JavaScript umgesetzt wird, wie bei unserem Areadiagramm und Balkendiagramm. Der Austausch mit Lea war dabei besonders hilfreich.

Ein weiteres zentrales Learning war der ETL-Prozess. Das Extrahieren von Daten aus der externen API «Aare Guru», deren Aufbereitung und das anschliessende Speichern in einer eigenen Datenbank war neu für uns. Besonders unterstützt hat uns dabei die visuelle Erklärung im Unterricht sowie das mehrmalige gemeinsame Durchgehen dieses Prozesses.

## Schwierigkeiten

- Die Charts mit Chart.js responsiv zu machen erwies sich als schwierig, da die Anpassungen direkt in JavaScript anstatt im CSS Dokument gemacht werden mussten.

- Der Daypicker war zuerst global gekoppelt, was bedeutet, dass wenn ein Start- und Enddatum für ein Diagramm ausgewählt wurde (z.B. Wasser- oder Lufttemperatur), übernahm automatisch auch das Diagramm der Wassermenge den gleichen Zeitraum. Um dies zu vermeiden, musste der Daypicker so konzipiert werden, dass jedes Diagramm seine Daten unabhängig laden und filtern kann.

- Zusätzlich war es herausfordernd, Start- und Enddatum im Daypicker korrekt darzustellen. Dafür waren Anpassungen an der MySQL-Datenstruktur notwendig.

## Ressourcen

- Live Coachings mit den Dozierenden
- Claude (AI) zur Unterstützung bei Problemen und Fragen
- Developer Mozilla für technische Erklärungen
