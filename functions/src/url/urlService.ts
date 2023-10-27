import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export class urlService {
  public async getUrls() {
    const urlSnap = await db.collection("Url").get();
    return urlSnap.docs.map((doc) => doc.data());
  }

  public async getOriginalUrl(short: string) {
    const urlSnap = await db
      .collection("Url")
      .where("short", "==", short)
      .get();
    return urlSnap.docs[0]?.data().long ?? "";
  }

  public async createUrl(short: string, long: string) {
    const res = await db.collection("Url").add({ short, long });
    return res.id;
  }

  public async deleteUrl(short: string) {
    const urlSnap = await db
      .collection("Url")
      .where("short", "==", short)
      .get();

    if (urlSnap.empty) {
      return;
    }

    const batch = db.batch();
    for (const doc of urlSnap.docs) {
      batch.delete(doc.ref);
    }
    await batch.commit();
  }
}
