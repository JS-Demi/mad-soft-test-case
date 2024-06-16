export function useSwapRoute(pathname: string) {
	const paths = pathname.split('/')
	return (nextRoute: string | number): string => {
		const newRoute = `${paths.slice(0, -1).join('/')}/${nextRoute}`
		return newRoute
	}
}
