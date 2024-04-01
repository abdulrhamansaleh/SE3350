import React, {useState, useEffect} from 'react'

const RequestAccountChanges = ({token}) => {
    const [isPopupActive, setIsPopupActive] = useState(false)
    const [requested, setRequested] = useState(false)

    //on mount need to fetch request changes value

    async function getRACStatus(id) {
        const res = await fetch('/findRAC', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accountId: id
            })
        })
        return res.json()

    }

    const getRAC = () => {
        getRACStatus().then((data) => {
            if (data.RAC) {
                setRequested(true)
            }  
        })
    }

    useEffect(()=>{
        getRAC()
    }, [])
    

    const togglePopup = () => {
        setIsPopupActive(!isPopupActive)
    }

    //set change as default to true, shouldnt require change value to be passed 
    //given the semantics of the function, but optionally can be passed.
    async function requestChanges(change = true, id) {
        const res = await fetch('/rac', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              requestedChange: change,
              accountId: id 
            })
        })
        return res.json()
    }
    
  
    const handleRequest = async e => {
      e.preventDefault();
      requestChanges(true, token?.accountId).then((data) => {
          console.log(data)
          if (data.success) {
              setRequested(true)
          } else {
              //what to do on error
          }
        })
    };

    return(
        <>
            {
                isPopupActive && 
                <div>
                    <button onClick={togglePopup}>
                        Request Account Changes
                    </button>
                </div>
            }
            {
                !isPopupActive &&
                <div>
                    {
                        requested && 
                        <h2>You have already requested account changes</h2>
                    }
                    <button onClick={handleRequest}>
                        Confirm account changes request.
                    </button>
                </div>

            }
            
        </>
    )
}

export default RequestAccountChanges