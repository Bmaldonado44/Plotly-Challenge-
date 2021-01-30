showOptions();
showData();

function showOptions() {
  d3.json('samples.json').then(data => {
    var { names } = data;
    names.forEach(name => {
      d3.select('select').append('option').text(name);
    });
  });
};

function showData() {
  //retrieve and store data 
  d3.json('samples.json').then(data => {
    var sel = d3.select('select').property('value');

    var { metadata, samples } = data;

    metadata = metadata.filter(obj => obj.id == sel)[0];
    d3.select('.panel-body').html('');
    Object.entries(metadata).forEach(([key, val]) => {
      d3.select('.panel-body').append('h5').text(key + ': ' + val);
    });

    samples = samples.filter(obj => obj.id == sel)[0];
    var { otu_ids, otu_labels, sample_values } = samples
    console.log(sample_values);
    //setting up variables for bar chart 
    var samplevalues = samples.sample_values.slice(0, 10).reverse();
    console.log(samplevalues);

    var top_otu = (samples.otu_ids.slice(0, 10)).reverse();
    var otu_id = top_otu.map(a => "OTU " + a)
    console.log(`OTU IDS: ${otu_id}`)
    console.log(top_otu);


    var labels = samples.otu_labels.slice(0, 10);
    console.log(otu_labels);

    ///building trace for bar chart 
    var trace = {
      x: samplevalues,
      y: otu_id,
      text: labels,
      marker: {
        color: 'rgb(142,124,195)'
      },
      type: "bar",
      orientation: "h",
    };


    var layout = {
      title: "Top 10 OTUs ",
      xaxis: { title: "Title" },
      yaxis: { title: "OTU" }
    };

    //show bar chart 
    Plotly.newPlot("bar", [trace], layout)
   /// start bubble chart
   var trace1 = {
    x: otu_id,
    y: samplevalues,
    mode: 'markers',
    marker: {
      color: otu_id,
      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
      opacity: [1, 0.8, 0.6, 0.4],
      size: samplevalues,
      size: [40, 60, 80, 100]
    }
  };
  console.log(trace1);
  
  
  var layout = {
    title: 'OTU ID',
    showlegend: false,
    height: 600,
    width: 600
  };
  
  Plotly.newPlot('bubble',[trace1], layout);
// 
console.log(layout);






  });
};



function optionChanged() {
  showData();
};