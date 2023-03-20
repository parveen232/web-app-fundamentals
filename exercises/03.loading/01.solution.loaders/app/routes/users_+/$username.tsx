import { json, type DataFunctionArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { getUserId } from '~/utils/auth.server'
import { prisma } from '~/utils/db.server'

export async function loader({ request, params }: DataFunctionArgs) {
	const loggedInUserId = await getUserId(request)
	const user = await prisma.user.findUnique({
		where: { username: params.username },
	})

	return json({
		isSelf: user?.id === loggedInUserId,
	})
}

export default function UserRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className="mt-36 mb-48">
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<Outlet />
		</div>
	)
}
