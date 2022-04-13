const app = new Vue({
    el: '#root',
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        active: 0,
        newText:'',
        searchContactName:'',
        textActive: [],
    },
    
    beforeMount(){
        this.contacts.forEach((contact, indexCustomer)=> {
            this.textActive[indexCustomer]=[];
            contact.messages.forEach((message, indexMessage) => {
                this.textActive[indexCustomer].push({'index': indexMessage, 'show': true, 'showOption': false})
            })
        })
    },

    methods: {
        setContactActive(index) {
            this.active = index;
        },
        sendMessage(){
            const newMessageObj = {
                date: dayjs().format('DD/MM/YYYY HH:mm'),
                text: this.newText,
                status:'sent'
            };

            this.contacts[this.active].messages.push(newMessageObj)
            
            this.newText = '';

            setTimeout(()=>{
                    const newTextReply = {
                    date: dayjs().format('DD/MM/YYYY HH:mm'),
                    text:'ok',
                    status:'received',
                };
                this.contacts[this.active].messages.push(newTextReply)
                this.contacts.forEach((contact, indexCustomer)=> {
                    this.textActive[indexCustomer]=[];
                    contact.messages.forEach((message, indexMessage) => {
                        this.textActive[indexCustomer].push({'index': indexMessage, 'show': true, 'showOption': false})
                    })
                })
            }, 1000);
        },
        searchContact() {
            this.contacts.forEach((element) => {
                if (element.name.toLowerCase().includes(this.searchContactName)){
                    element.visible = true;
                }
                else{
                    element.visible = false ;
                }
            });
        },
        getLastDate(index) {
            if (this.contacts[index].messages.length == 0){
                return "";
            }
            return this.contacts[index].messages[this.contacts[index].messages.length - 1].date;
        },
        getLastText(index){
            if (this.contacts[index].messages.length == 0){
                return "...";
            }
            return this.contacts[index].messages[this.contacts[index].messages.length - 1].text.slice(0, 30) + '...';
        },
        showOption(indexCustomer, indexMessage){
            let customerStatus = this.textActive[indexCustomer]
            let messageStatus = customerStatus.find((value) => value.index == indexMessage);
            messageStatus.showOption = !messageStatus.showOption;
            this.$forceUpdate();
        },
        deleteMessage(indexContact, indexMessage){
            this.contacts[indexContact].messages.splice(indexMessage, 1);
        },
        checkOptionIsValid(indexMessage){
            console.log(this.textActive[this.active][indexMessage]);
            return this.textActive[this.active][indexMessage].showOption;
        }
    }
}
);