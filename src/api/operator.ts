import client from "@/lib/axios";

const department_id = "8f185526-cdb5-45f3-87e5-628ff56e69a0";
const window_id = "277dabce-f120-42f5-bfac-a70c3b9b4406";

export async function getCurrentTicket() {
    const res = await client.get(`/queue/department/${department_id}/windows/${window_id}/current`);

    if (res.data) {
        const data = res.data;
        const res2 = await client.get(`/services/services/${data['service_id']}`);

        return {
            ...data,
            service_name: res2.data['name'],
        };
    }

    return null;
}

export async function endCurrent(item_index: string) {
    return (await client.put(`/queue/department/${department_id}/queue/${item_index}`, {
        status: 2
    })).data;
}

export async function cancelCurrent(item_index: string) {
    return (await client.put(`/queue/department/${department_id}/queue/${item_index}`, {
        status: 3
    })).data;
}

export async function callNext() {
    return (await client.post(`/queue/department/${department_id}/windows/${window_id}/request-new`)).data;
}