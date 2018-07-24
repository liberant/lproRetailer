import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase/app';
import { User } from '../../models/user-model';
import { Business } from '../../models/business-model';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class AuthProvider {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  business$: BehaviorSubject<Business> = new BehaviorSubject<Business>(null);

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore
  ) { }

  loadUser(uid: string) {
    this.afs.doc<User>(`user/${uid}`).valueChanges().pipe(first()).subscribe(data => {
    this.user$.next(data);
    this.loadBusiness(data.busId);
  });
}

  loadBusiness(bid: string) {
      this.afs.doc<Business>(`business/${bid}`).valueChanges().pipe(first()).subscribe(data => {
        this.business$.next(data);
      });
  }

 loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
/*
  async createAdminUser(
    email: string,
    password: string
  ): Promise<firebase.User> {
    try {
      const adminUserCredential: firebase.auth.UserCredential = await this.afAuth.auth
        .createUserWithEmailAndPassword(
          email,
          password
        );
      const userProfileDocument: AngularFirestoreDocument<
        userProfile
        > = this.fireStore.doc(`userProfile/${adminUserCredential.user.uid}`);

      const teamId: string = this.fireStore.createId();

      await userProfileDocument.set({
        id: adminUserCredential.user.uid,
        email: email,
        teamId: teamId,
        teamAdmin: true
      });

      const teamProfile: AngularFirestoreDocument<
        teamProfile
        > = this.fireStore.doc(`teamProfile/${teamId}`);

      await teamProfile.set({
        id: teamId,
        teamAdmin: adminUserCredential.user.uid,
        groceryList: null
      });

      return adminUserCredential.user;
    } catch (error) {
      console.error(error);
    }
  }

  async createRegularUser(email: string): Promise<any> {
    const teamId: string = await this.inventoryProvider.getTeamId();

    const userCollection: AngularFirestoreCollection<
      any
      > = this.fireStore.collection(`teamProfile/${teamId}/teamMemberList`);
    const id: string = this.fireStore.createId();

    const regularUser = {
      id: id,
      email: email,
      teamId: teamId
    };

    return userCollection.add(regularUser);
  }
*/
}
