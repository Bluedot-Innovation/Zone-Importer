## Setting up

Before running the script, we need to set up your API keys and point to a csv file. Create a `.env` file and add the following 3 keys, filling them with your own details. If the `CSV_FILE_NAME` is left blank, the importer will prompt you to choose a file in the `csv` folder.

```
CUSTOMER_API_KEY=<Add key here>
API_KEY=<Add key here>
CSV_FILE_NAME=<Add file name here>
```

## Example CSV files

We've provided some example CSVs in this folder in the `/csv` folder.

## CSV formatting

### Minimum retrigger time

The amount of time before the zone can be retriggered.

- Syntax: `<hours:minutes>`
- Example: `0:40` (40 minutes)

### Time active

The times in which the fences can be triggered.

- Syntax: `<start time>;<end time>`
- Example: `09:00;15:00`

### Fences

Rectangle:
- Syntax: `rectangle;<northeast latlng>;<southwest latlng>`
- Example: `rectangle;-37.816445904181826 144.9800987589997;-37.81836983026806 144.9776847708863`

Circle:
- Syntax: `circle;<radius(meters)>;<latlng>`
- Example: `circle;118;-37.817534428563256 144.98273693998692`

Polygon:
- Syntax: `polygon;<vertice latlng>;<...unlimited vertice latlng's>`
- Example: `polygon;-37.81648346766491 144.9862989135587;-37.81861927573189 144.98503291090367;-37.81856842387702 144.98773657759068|geoline;-37.816479942621314 144.98946905136108`

Geoline:
- Syntax: `geoline;<vertice latlng>;<...unlimited vertice latlng's>`
- Example: `geoline;-37.81648346766491 144.9862989135587;-37.81861927573189 144.98503291090367;-37.81856842387702 144.98773657759068`

Multiple Fences:
- Separate multiple fences with the `|` character
- Syntax: `<fence name>;<parameters>|<fence name>;<parameters>`
- Example: `rectangle;<northeast latlng>;<southwest latlng>|circle;118;-37.817534428563256 144.98273693998692`

## Required fields

These fields cannot be blank in the csv file.

- `zoneName`
- `minimumRetriggerTime`

## Additional info

A custom action is automatically added on to the zones to make sure the SDKs call back the mobile app when users visit the zones.

## Node version

Please make sure you are running at least node version 6, as this code uses features unsupported in earlier versions.

## Running the script

To run the script, execute the following commands from your CLI. First install with:

`npm install`

To run the import on a CSV run:

`node src/index.js <path_to_filename>`
