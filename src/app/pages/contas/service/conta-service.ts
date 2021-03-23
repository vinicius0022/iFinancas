import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { DateHelper } from '../../helpers/dateHelper';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  collection: AngularFirestoreCollection;

  constructor(
    private db: AngularFirestore
  ) { }

  registraConta(conta){
    conta.id = this.db.createId();
    this.collection = this.db.collection('conta');
    return this.collection.doc(conta.id).set(conta);
  }

  lista(tipo){
    this.collection = this.db.collection('conta', ref => ref.where('tipo', '==', tipo));
    return this.collection.valueChanges();
  }

  remove(conta){
    this.collection = this.db.collection('conta');
    this.collection.doc(conta.id).delete();
  }

  edita(conta){
    this.collection = this.db.collection('conta');
    this.collection.doc(conta.id).update(conta);
  }

  total(tipo, date) {
    const aux = DateHelper.breakDate(date);
    const ano = aux.ano;
    const mes = aux.mes;

    this.collection = this.db.collection('conta', ref => ref.where('tipo', '==', tipo)
       .where('mes', '==', mes)
       .where('ano', '==', ano));

    return this.collection.get().pipe(map(snap => {
      let count = 0;
      let sum = 0;
      snap.docs.map(doc => {
        const conta = doc.data();
        const valor = parseFloat(conta.valor);
        sum += valor;
        count++;
      });
      
      return { num: count, valor: sum }
    }));
  }
}
