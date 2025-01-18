async function analyzeSignal() {
    const signal = document.getElementById('signal').value;
    const url = "https://signal-analasys-ff08050bb06d.herokuapp.com/analyze";
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signal, fs: 1000 })
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
    ], { title: 'Time-Domain Signals' });

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
    ], { title: 'Magnitude Spectrum' });

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
    ], { title: 'Phase Spectrum' });
}

document.getElementById("analyze-btn").addEventListener("click", analyzeSignal);
