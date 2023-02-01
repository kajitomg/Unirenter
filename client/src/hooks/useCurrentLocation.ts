import { useEffect, useState } from "react"

export const useCurrentLocation = () => {
	const [location, setLocation] = useState(window.location)


	useEffect(() => {

		setLocation(window.location)

	}, [window.location.search, window.location.pathname])

	return location
}