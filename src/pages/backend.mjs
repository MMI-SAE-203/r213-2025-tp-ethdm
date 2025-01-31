import Pocketbase from 'pocketbase';
const pb = new Pocketbase("http://127.0.0.:8090");

export const events = await pb.collection("events").getFundList