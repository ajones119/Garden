import React, { useEffect } from "react";

const DummyComponent = () => {

    useEffect(() => {
        const longRunningFetch = async () => {
            await setTimeout(() => {console.log('done')}, 3000)
        }

        longRunningFetch()
    }, [])

    return (<div>DUMMY</div>)
}

export default DummyComponent;