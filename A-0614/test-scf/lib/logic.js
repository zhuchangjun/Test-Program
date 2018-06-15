/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
* Sample transaction
* @param {scf.AccountTransfer} accountTransfer
* @transaction
*/
function accountTransfer(accountTransfer) {
    if (accountTransfer.from.balance < accountTransfer.to.balance) {
            throw new Error ("Insufficient funds");
    }
    accountTransfer.from.balance -= accountTransfer.amount;
    accountTransfer.to.balance += accountTransfer.amount;
    console.log('### accountTransfer.to.loans ' + accountTransfer.to.loans);
    accountTransfer.to.loans = accountTransfer.loanId;
    console.log('### accountTransfer.to.loans ' + accountTransfer.to.loans);
    return getAssetRegistry('bank.Account')
    .then (function (assetRegistry) {
            return assetRegistry.update(accountTransfer.from);
    })
    .then (function () {
            return getAssetRegistry('bank.Account');
    })
    .then(function (assetRegistry) {
            return assetRegistry.update(accountTransfer.to);
    });
}