async function analyzeSignal() {
    const signal = document.getElementById('signal').value;
    const url = "https://signal-analasys-ff08050bb06d.herokuapp.com/analyze"
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signal, fs: 1000 })
    });
    const data = await response.json();
    // console.log(data)
    // Plot time-domain signal
    Plotly.newPlot('time-domain', [{
        x: data.time_domain.time,
        y: data.time_domain.signal,
        type: 'scatter'
    }], { title: 'Time-Domain Signal' });

    // Plot magnitude spectrum
    Plotly.newPlot('magnitude-spectrum', [{
        x: data.magnitude_spectrum.frequencies,
        y: data.magnitude_spectrum.magnitudes,
        type: 'scatter'
    }], { title: 'Magnitude Spectrum' });

    // Plot phase spectrum
    Plotly.newPlot('phase-spectrum', [{
        x: data.phase_spectrum.frequencies,
        y: data.phase_spectrum.phases,
        type: 'scatter'
    }], { title: 'Phase Spectrum' });
}

document.getElementById("analyze-btn").addEventListener("click", analyzeSignal)