import { Router } from "express";
import axios from "axios";
import * as https from "node:https";
import * as http from "node:http";

const appRouter = Router()
axios.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});
appRouter.get('/', async(req, res) => {
    const cookies = '__ddg1_=ePcBjBmCEoamgLXnGSTV; inviter=eyJpdiI6IkYrcmUxYTk0L3FnSWQ3eWR2V083aWc9PSIsInZhbHVlIjoiYnl1MTlPaVY5V2pjYmxiN2U1eEFwOThjQXNYYjV3bFY4bFlrVHRKQXI5TU0xc3Z3WDBYbGhES1VRdXZ6QlRITzRpRC9KSW5WQk5YYURhL2FNYkpRNUE9PSIsIm1hYyI6IjJkZGU5NGUyZjE0ODE3Y2FmNjI2MzU2OTM4NGZjNmY5Y2NiZTZkY2ZmZWQ3MWNkNDM1Y2ZiMGEyZWE2YTllNDUiLCJ0YWciOiIifQ%3D%3D; p4s_p_push_subscription_status=blocked; remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6IkFHRHcxNDhyZHBuMUV5KzhCd08xcXc9PSIsInZhbHVlIjoiREVtYnkxYS9GN0RJM3o2TEd5UGJhblV0cVpFZ2hxSUtoOXNQUWgwdStYdE15SzhCWWhkWlZ3Q082SkJ4Y2NaVFFOYlkxdFhrZ3NzaUJtNTltMDBuNzBKVXg0aDZyYS9NUVQvMmJoMnlUeUQvc1lSWll2aTZRVmt0TU5TakpIU3hXQ0J4dEVtMnRvSnhNWlVnaHlqekpBPT0iLCJtYWMiOiI2NGU1YmY1NzkzMWY0OWUwMTg1NTE3ZjhmYWRjZTBjNDEzNTU2YWU5MTY3ZGE4YzM4ZWZmYTU5ODUxNmI5YWY4IiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6IlpaWWRDalkvd1lkSTJ1d0pSektsaEE9PSIsInZhbHVlIjoiTk9WUkdGSjMwa0pNUXREU3FBeHNJOUdKZVR4eFYrQVMrUkhhMGdGTDVpaE12bElYdlUxdkVnUS9WM25jMllBWkxoemdPV2VKQ1VoUlpzOVNjOTBnYU9RUEJBa1E1YStZRWxKQ0NOVmZpUEpMS3dPQ21BSG1FZ0h5eEM5Q2Jud2EiLCJtYWMiOiJkYzk2YWJiNGIwNDE4YjdlYmVmNDYyZGE4MTk2NjlmMGZjNzQwNjc1ZGNiNTVjOGRlMjMyZWYxMGIyNzMzZTk0IiwidGFnIjoiIn0%3D; gd_ses=eyJpdiI6InB4dWR6QlpHSUZOUDNmaDl3UEc3S0E9PSIsInZhbHVlIjoiNkkyTEtUTkkwa0dkVW5VWHR0RjFLeUI3K3VVa1FCdVhSMGNSK0hxbmNFdTk2TXVhMUovbGdpT1h4TWVaVG1xQ25UUXhYWTRDTVhXL3NFUHJXT0FiVkRiYU43QThONjRZQ1Brd3RkeTAyL0d6UmxVeW1iOEpLT1UwOGZBaUJEckIiLCJtYWMiOiIzYWJiNzQxZmZmOTE2M2U3NTgyZDdhOWY4ZTg0ODIxNTUzM2NkZDdhZThjOGZhNjdjMjMxYWJmMTI0ZjhjNTAxIiwidGFnIjoiIn0%3D; l5wXAXz2IEEaGFpaqUT5i4IKNzZYT574FneuwHCj=eyJpdiI6IkJkZmE3UnVlaXhOQ1pFK1NuUEs2dnc9PSIsInZhbHVlIjoiZ1NlYVVMRk5tNlR6OFJrT0Z2UE9TUmZJVWRYZFdnUklMcEFWODYrcFdJRU5RQk1mNVdDRUE5eFpDVHl6Umd3WmpJYVEyVDMxNGlMNEpxdmVvN0tLYjZUaFM3dmJkOWFwdXJlQm5SR0swbzdDbUxsejRYSGZnQWU3alA1ZmV1b3BsNnE4ODE0MUd3SnBwajVhVE95cXZRVk5wMVQ5NXZ0eW5PbEh4WFpjUDVsK2ZCWm1xbGN2UE9PNVpUaG5sYys3YlRJVjdCQkFUSStVdTRPQTZZTm9LbUMyVGJUMmh5enA5dUVDU0NHSWJhS01RTzJLd0hYY1dTWElqUmdYMVBKbEdzYVhMWlZVbWRpUUVhbVFBcDg1WXBUU2VNdDZXaTc4eTNuRUFmMkdnSzVac04yTkhYeTJKc3prQTZpZ05HNE16bUlWZGpYVFNPUitoU0hXekF5aEtRTkcrQW9udUdWVHJtUWpCV0UxclVhT2VsS0NwMUNscnF1TkcwR1FhdTlvaW1hNExnb2VRYURZTmg4aXJCQWdwa0VpUWFoc2NCOHJrSjhTbTBqV2ZmdHMzcG51TXQ5czVESnhYT3VhNDV0YUpTY1hIVDB1MU44MzFjY21aN0pSelAvMk1OUVJrVklRa2ZZOWFuNDUrd2J4NHJzQnNiMkkySEV6Q2k0NWxlc3dLTkJObXNGODNaam82a1BvMVZDOHZld0tHbzNhaDEvUW5NcVF5YmVFL0FxZXR3RWxQT3pQSmNQcXpMbGRRTU1ucy9uMy9Vb1NYMk9XdzIwbHN1b0lkL01Qbk44b2kxajhpRm9GbEcyTmFEeTU4TnVBaWpLY3R0RkxWckpLK0ZoSFRZbU1aZUZxa3pDL1E2V3l2bndsQjd3dGc0bncrMC9aTUpFVkZBbjFGSHoyL0pKT3NmNUZVWlpERVZRdFc2QXlRQnBrMStUM2tDZVZJdElNOTU4QTFyZ3l4S0Z4dDYzbS9BSmxnVkFTMUdkZjBwZFhTRytyTllZSjRxQWJFYm1zYmZ6SFp5SnZFQS9LRVBHNDNwc2hGTEJJU01PNTR0ZGx2ZDV1Z0Q1aWhMVnlSQk9KZVBFVVpNNnlRVzI3ZFlyWExWVnRVTlh2TU80aXdpVDdYcFZGT2tGT3BGVEROb0d2N2FOYzRUTVdPeHpkd2JJSHNRcEJhY1BuWENjWmFBVjcvVFpzbUpBMTliNndEUDJlaElyUzhCNEt0Q1BLdmlsaUlmVUlXOHgvblR6UzhiWFhGbVRJc3BZQzNJYkkvTUI2cEZ1dlI4dGhsQTZWRVJuOTJUNXlCR0Z1VStIdTlkR2l3c09ZN0lGODhUd1BhT0JsOXZrMU5lazRGeExnSzhPdUtTcFZBVjkrRFMwUEFjcm11ZXF1S25Rd3FycUhKZkJkelg4K3R0akRuZFE9IiwibWFjIjoiNWFhZWU5NjExYjRmN2ViODdhM2JlNjc0ZWFiZDA2MTk1NzQxODg4MTIzZGIxMGQ1NmY5ZjM2MWUxZWI1NTc1MSIsInRhZyI6IiJ9'
    try {
        await axios.post('https://genshindrop.com/checkin/checkin', {}, {
            headers: {
                Cookies: cookies,
                'authority': 'genshindrop.com',
                'method': 'POST',
                'path': '/checkin/checkin',
                'scheme': 'https',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'ru,en-GB;q=0.8,en-US;q=0.7',
                'Content-Length': '0',
                'Origin': 'https://genshindrop.com',
                'Referer': 'https://genshindrop.com/checkin',
                'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
                'X-Csrf-Token': 'SWvS398joSDPrv89hAw9KPv7zanLHry6np2iMusp',
                'X-Requested-With': 'XMLHttpRequest',
                'X-Xsrf-Token': 'eyJpdiI6IlhmdemltGenErMjdcKyt5aUdjWYc9PSIsInZhbHVIjoiNWE9QzhVaUtHVZ2pEcK0YOVJQyZjdcWZHM2ZaYTI2MGJlwiMGZnRVZJfKJNdJhNjI3NzU2NG9mNDEN3NE20ZTgyZG1wZmw5djY0YmViOiIiFQ%3D%3D'
            },
            withCredentials: true
        })
        res.json('120 примогемов')

    } catch (e) {
        res.status(401).send({error: e})
    }
})

export default appRouter