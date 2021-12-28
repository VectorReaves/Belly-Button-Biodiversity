// create a function that uses the data from sample.
function buildMetadata(selection) {

    d3.json("samples.json").then((data) => {
        // create variables to reference specific data
        var parseData = sampleData.metadata;
        var sample = parseData.filter(item => item.id == selection);
        var metadata = d3.select("#sample-metadata").html("");

        Object.entries(sample[0]).forEach(([key, value]) => {
            metadata.append("p").text(`${key}: ${value}`);
        });

    });
}

function buildCharts(selection) {

    d3.json("samples.json").then((data) => {
// Define variables to set up charts
        var parseData = sampleData.samples;
        var sampleDictionary = parseData.filter(item => item.id == selection)[0];
        var sample_values = sampleDictionary.sample_values;
        var barChart = sample_values.slice(0, 10).reverse();
        var idValues = sampleDictionary.otu_ids;
        var bar_chart_labels = idValues.slice(0, 10).reverse();
        var reformatted_labels = [];
        bar_chart_labels.forEach((label) => {
            reformatted_labels.push("otu_ids " + label);
        });

        var hovertext = sampleDictionary.otu_labels;
        var bar_chart_over_text = hovertext.slice(0, 10).reverse();
        var bar_chart_trace = {
            type: "bar",
            y: reformatted_labels,
            x: barChart,
            text: bar_chart_over_text,
            orientation: 'h'
        };

        var bar_chart_data = [bar_chart_trace];
 // Create bar graph here
        Plotly.newPlot("bar", bar_chart_data);

        var bubble_chart_trace = {
            x: idValues,
            y: sample_values,
            text: hovertext,
            mode: "markers",
            marker: {
                color: idValues,
                size: sample_values
            }
        };

        var bubble_chart_data = [bubble_chart_trace];

        var layout = {
            height: 700,
            width: 600,
            xaxis: {
                title: "otu_ids"
            }
        };

        Plotly.newPlot("bubble", bubble_chart_data, layout);
    });
}

function init() {

    d3.json("Data/samples.json").then((data) => {
        var parseData = sampleData.names;
        var dropdownMenu = d3.select("#selDataset");
        parseData.forEach((name) => {
            dropdownMenu.append("option").property("value", name).text(name);
        })

        buildMetadata(parseData[0]);
        buildCharts(parseData[0]);

    });
}
// call the functions to show the data and plots

function optionChanged(SelectionTwo) {
    buildMetadata(SelectionTwo);
    buildCharts(SelectionTwo);
}

init();