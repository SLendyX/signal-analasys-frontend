async function analyzeSignal() {
    const style = 
    { 
        title: 'Time-Domain Signals',
        paper_bgcolor: "#121212", 
        plot_bgcolor: "#121212",
        font: {
            color: "#f5f5f5"
        }
        
    }
  //  https://signal-analasys-ff08050bb06d.herokuapp.com/analyze
    const {value: signal} = document.getElementById("signal")

    const [
        {value: fs},
        {value: samples}, 
        {value: cutoff}, 
        {value: noise}
    ] = document.getElementsByTagName("input")



    const analyzeObject = {signal, fs, samples,cutoff, noise}

    for(const key in analyzeObject){
        if(!analyzeObject[key])
            delete analyzeObject[key]
    }

    if(analyzeObject?.noise)
        analyzeObject.noise = noise.split(/, ?/g)


    const url = "https://signal-analasys-ff08050bb06d.herokuapp.com/analyze";
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
        { 
            ...analyzeObject 
        })
    });

    const data = await response.json();
    // Plot time-domain signals
    Plotly.newPlot('time-domain', [
        {
            x: data.time_domain.time,
            y: data.time_domain.noisy_signal,
            type: 'scatter',
            name: 'Noisy Signal',
            line: {
                color: 'red', // Change the line color for the noisy spectrum
                width: 2 // Optional: set the line width
            },
        },
        {
            x: data.time_domain.time,
            y: data.time_domain.filtered_signal,
            type: 'scatter',
            name: 'Filtered Signal',
            line: {
                color: 'cyan', // Change the line color for the noisy spectrum
                width: 2 // Optional: set the line width
            },
        }
    ], style);

    // Plot magnitude spectrum
    Plotly.newPlot('magnitude-spectrum', [
        {
            x: data.magnitude_spectrum.frequencies,
            y: data.magnitude_spectrum.original_magnitudes,
            type: 'scatter',
            name: 'Noisy Spectrum',
            line: {
                color: 'red', // Change the line color for the noisy spectrum
                width: 2 // Optional: set the line width
            },
        },
        {
            x: data.magnitude_spectrum.frequencies,
            y: data.magnitude_spectrum.filtered_magnitudes,
            type: 'scatter',
            name: 'Filtered Spectrum',
            line: {
                color: 'cyan', 
                width: 2 
            },
        }
    ], style);

    // Plot phase spectrum
    Plotly.newPlot('phase-spectrum', [
        {
            x: data.phase_spectrum.frequencies,
            y: data.phase_spectrum.original_phases,
            type: 'scatter',
            name: 'Noisy Phase',
            line: {
                color: 'red', // Change the line color for the noisy spectrum
                width: 2 // Optional: set the line width
            },
        },
        {
            x: data.phase_spectrum.frequencies,
            y: data.phase_spectrum.filtered_phases,
            type: 'scatter',
            name: 'Filtered Phase',
            line: {
                color: 'cyan', 
                width: 2 
            },
        }
    ], style);
}

document.getElementById("analyze-btn").addEventListener("click", analyzeSignal);
