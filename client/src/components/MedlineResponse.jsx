import React from 'react'

export default function MedlineResponse (props) {

  let medlineResponse = [];

    const xmlDocument = new DOMParser().parseFromString(props.medication, 'text/xml');

    const entries = xmlDocument.querySelectorAll('entry');

    for (const entry of entries) {

      const medicineEntry = {
        name : entry.querySelector('title').textContent,
        link : entry.querySelector('link'),
        summary : entry.querySelector('summary').textContent,
      }

      const hrefValue = medicineEntry.link.getAttribute("href");
      medicineEntry.link = hrefValue;

      //console.log(`Name: ${medicineEntry.name}, Link: ${medicineEntry.link}, Summary: ${medicineEntry.summary}`);
      
      medlineResponse.push(medicineEntry);
    }

  return (
    <div>
      {props.medication && props.medication.length > 0 ? (
        <div>
          <h3>Medication Information</h3>
            <ul>
              {medlineResponse.map((entry, index) => (
                <li key={index} className="mb-3 resourceList" >
                  <h4>{entry.name}</h4>
                  {entry.summary && (
                    <div 
                      className="summary"
                      dangerouslySetInnerHTML={{ 
                        __html: entry.summary 
                      }}
                    />
                  )}
                  {entry.link &&
                    <a className="text-muted" 
                      href={entry.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </a>
                  }
                </li>
              ))}
            </ul>
        </div>
      ) : (
        <p>No medication information available.</p>
      )}
    </div>
  )
}
