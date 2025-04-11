// Init logic (Firestore instance, config)

import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  Firestore,
  getFirestore,
  DocumentData,
} from "firebase/firestore";
import helpers from "@/utils/helpers";

class FirePlus {
  private static instance: FirePlus;
  #app!: FirebaseApp;
  #db!: Firestore;

  constructor(options: FirebaseOptions) {
    if (FirePlus.instance) {
      return FirePlus.instance; // Return existing instance
    }
    FirePlus.instance = this; // Store instance
    this.#app = initializeApp(options);
    this.#db = getFirestore(this.#app);
  }

  static init(options?: FirebaseOptions) {
    if (options) return new FirePlus(options);
    else {
      if (!this.instance) throw new Error("FirePlus not initialized");
      return this.instance;
    }
  }

  private getCollectionName() {
    return helpers.pluralize(this.constructor.name);
  }

  protected getPrimitiveProps(): DocumentData {
    return helpers.getPrimitiveProps(this);
  }

  async save(): Promise<string | null> {
    try {
      const data = this.getPrimitiveProps();
      if (Object.keys(data).length === 0) {
        throw new Error("Empty object cannot be saved");
      }

      const docRef = await addDoc(
        collection(this.#db, this.getCollectionName()),
        data
      );
      return docRef.id;
    } catch (error) {
      console.error("Error saving document:", error);
      return null;
    }
  }

  // async findAll(table: string): Promise<any[]> {
  //   let data: any = [];
  //   try {
  //     const querySnapshot = await getDocs(collection(this.#db, table));
  //     querySnapshot.forEach((doc) => {
  //       data.push({ id: doc.id, ...doc.data });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   return data;
  // }

  // async deleteById(table: string, id: string) {
  //   try {
  //     await deleteDoc(doc(this.#db, table, id));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}

export default FirePlus;
