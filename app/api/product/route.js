import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server';

export async function GET(request) {
  const uri = "mongodb+srv://Asus:$UM!T376@cluster0.vvhlsc0.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    const database = client.db('StockMS');
    const inventor = database.collection('inventory');

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const allproduct = await inventor.find(query).toArray();

    console.log(allproduct);
    return NextResponse.json({ allproduct })
  } finally {

    await client.close();
  }
}
export async function POST(request) {
  let body = await request.json();
  const uri = "mongodb+srv://Asus:$UM!T376@cluster0.vvhlsc0.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    const database = client.db('StockMS');
    const table = database.collection('inventory');
    const product = await table.insertOne(body);

    console.log(product);
    return NextResponse.json({ product,ok:true })
  } finally {

    await client.close();
  }
}