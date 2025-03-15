import React, { useState } from 'react'; // Import React library; 
// useState imports a hook function useState to change state of components

function App() {
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [smokingStatus, setSmokingStatus] = useState('non-smoker');
  const [lifestyle, setLifestyle] = useState('Medium');
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Simple function to estimate life expectancy based on inputs.
  const calculateLifeExpectancy = () => {
    let baseLifeExpectancy = 80; // baseline expectation
    const currentAge = parseInt(age) || 0;
    
    // Calculate BMI (assuming height is in cm and weight in kg)
    const heightMeters = height / 100;
    const bmi = height && weight ? weight / (heightMeters * heightMeters) : 0; //The expression height && weight checks if both height and weight have values. If either is empty, undefined, or zero (falsy), the check fails.

    // Adjust based on BMI
    if (bmi > 25) {
      baseLifeExpectancy -= 5;
    } else if (bmi < 18.5) {
      baseLifeExpectancy -= 3;
    }
    // Adjust based on smoking status
    if (smokingStatus === 'smoker') {
      baseLifeExpectancy -= 10;
    } else if (smokingStatus === 'ex-smoker') {
      baseLifeExpectancy -= 5;
    }
    // Adjust based on lifestyle
    if (lifestyle === 'Low') {
      baseLifeExpectancy -= 3;
    } else if (lifestyle === 'High') {
      baseLifeExpectancy += 3;
    }
    // Adjust based on sex
    if (sex === 'female') {
      baseLifeExpectancy += 5;
    }

    return currentAge + baseLifeExpectancy;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stops the form from refreshing the page when submitted

    // checks whether the user has given their consent (by checking the consent state). 
    // If consent isn’t provided, it shows an alert and stops further execution.
    if (!consent) {
      alert('Please provide your consent to proceed.');
      return;
    }

    // If consent is provided, it calls the calculateLifeExpectancy function 
    // to compute an estimated life span.
    const lifeSpan = calculateLifeExpectancy();
    setResult(lifeSpan);
    setShowDisclaimer(true);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Life Expectancy Predictor ⏳</h1>
      <h2>Ever wondered how your lifestyle choices impact your lifespan? Let's crunch the numbers.</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age: </label>
          <input
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sex: </label>
          <select value={sex} onChange={e => setSex(e.target.value)} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Height (cm): </label>
          <input
            type="number"
            value={height}
            onChange={e => setHeight(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Weight (kg): </label>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Smoking Status: </label>
          <select value={smokingStatus} onChange={e => setSmokingStatus(e.target.value)} required>
            <option value="non-smoker">Non-Smoker</option>
            <option value="ex-smoker">Ex-Smoker</option>
            <option value="smoker">Smoker</option>
          </select>
        </div>
        <div>
          <label>Lifestyle Activity: </label>
          <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
            />
            I acknowledge that this information is for entertainment/educational purposes only and not a medical diagnosis.
          </label>
        </div>
        <button type="submit">Press the button to see your results.</button>
      </form>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Estimated Total Life Span: {result} years</h2>
          {/* Simple progress bar visualization (assuming 122 years as max for scale) */}
          <div style={{ background: '#eee', height: '20px', width: '100%', borderRadius: '10px' }}>
            <div
              style={{
                background: '#4caf50',
                width: `${(result / 122) * 100}%`,
                height: '100%',
                borderRadius: '10px'
              }}
            ></div>
          </div>
          <p>The oldest verified human lifespan on record is 122 years and 164 days, achieved by Jeanne Calment of France, who died in 1997. That’s the highest age with reliable documentation recognized by researchers. However, from a scientific standpoint, there isn’t a universal consensus on whether there’s a strict biological “cap” on human longevity.

Most researchers agree that while living past 120 is extremely rare, improvements in healthcare, lifestyle, and biotechnology might gradually increase longevity. But as of now, 122 years stands as the documented maximum.</p>
        </div>
      )}

      {showDisclaimer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <p>Disclaimer: This is for educational and entertainment purposes only. It is not medical advice.</p>
            <button onClick={() => setShowDisclaimer(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

