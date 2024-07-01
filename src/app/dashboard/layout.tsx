import { LayoutView, funGetAccessAdmin } from "@/modules/_global";
import { funGetUserByCookies, pwd_key_config } from "@/modules/auth";
import { funGetCountPendingRequest } from "@/modules/mlai";
import { unsealData } from "iron-session";
import _ from "lodash";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Layout({ children }: { children: React.ReactNode }) {
    const c = cookies().get("_cookiesNinox")
    if (!c || _.isUndefined(c) || !c.value || _.isEmpty(c.value)) return redirect('/')
    const dataCookies = await unsealData(c!.value, { password: pwd_key_config as string })
    if (_.isEmpty(dataCookies)) return redirect('/')

    const menu = await funGetAccessAdmin()
    const user = await funGetUserByCookies()
    const request = await funGetCountPendingRequest()

    return (
        <>
            <LayoutView dataMenu={menu} dataUser={user} pending={request}>
                {children}
            </LayoutView>
        </>
    );
}