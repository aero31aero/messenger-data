const fs = require('fs');

const hindi_words = 'aand,aandu,balatkar,balatkari,behen chod,beti chod,bhadva,bhadve,bhandve,bhangi,bhootni ke,bhosad,bhosadi ke,boobe,chakke,chinaal,chinki,chod,chodu,chodu bhagat,chooche,choochi,choope,choot,choot ke baal,chootia,chootiya,chuche,chuchi,chudaap,chudai khanaa,chudam chudai,chude,chut,chut ka chuha,chut ka churan,chut ka mail,chut ke baal,chut ke dhakkan,chut maarli,chutad,chutadd,chutan,chutia,chutiya,gaand,gaandfat,gaandmasti,gaandufad,gandfattu,gandu,gashti,gasti,ghassa,ghasti,gucchi,gucchu,harami,haramzade,hawas,hawas ke pujari,hijda,hijra,jhant,jhant chaatu,jhant ka keeda,jhant ke baal,jhant ke pissu,jhantu,kamine,kaminey,kanjar,kutta,kutta kamina,kutte ki aulad,kutte ki jat,kuttiya,loda,lodu,lund,lund choos,lund ka bakkal,lund khajoor,lundtopi,lundure,maa ki chut,maal,madar chod,mooh mein le,mutth,mutthal,najayaz,najayaz aulaad,najayaz paidaish,paki,pataka,patakha,raand,randaap,randi,randi rona,saala,saala kutta,saali kutti,saali randi,suar,suar ke lund,suar ki aulad,tatte,tatti,teri maa ka bhosada,teri maa ka boba chusu,teri maa ki behenchod ,teri maa ki chut,tharak,tharki,tu chuda'.split(',');

const get_participant_map = () => {
    const data = [
        { name: 'Rohitt Vashishtha', batch: 0 },
        { name: 'Karthik Nagaraj', batch: 0 },
        { name: 'Ramana Sriram', batch: 0 },
        { name: 'Monith Sourya', batch: 0 },
        { name: 'Ananya Mohapatra', batch: 0 },
        { name: 'Shanmukh Nama', batch: 0 },
        { name: 'Musaiyab Ali Mirza', batch: 0 },
        { name: 'Kushagra K Chanda', batch: 0 },
        { name: 'Viswanatha Kasyap Pasumarthy', batch: 0 },
        { name: 'Sandeep Jimmy', batch: 0 },
        { name: 'Vedika Kulkarni', batch: 0 },
        { name: 'Manish Kumar', batch: 0 },
        { name: 'Vamsi Nallapareddy', batch: 0 },
        { name: 'Chellapilla Shri Akhil', batch: 0 },
        { name: 'Rushabh Musthyala', batch: 0 },
        { name: 'Vinith Bhandari', batch: 0 },
        { name: 'Tushar Aggarwal', batch: 0 },
        { name: 'Paavani Khanna', batch: 0 },
        { name: 'Shreejee Agarwal', batch: 0 },
        { name: 'Nivedan Vishwanath', batch: 0 },
        { name: 'Prajjwal Vijaywargiya', batch: 0 },
        { name: 'Aditya Ramaswami', batch: 0 },
        { name: 'Triyasha Ghosh Dastidar', batch: 0 },
        { name: 'Suhita Saha', batch: 0 },
        { name: 'Venkatesh Jaya', batch: 0 },
        { name: 'Palak Oswal', batch: 0 },
        { name: 'Nikita Mandapati', batch: 0 },
        { name: 'Shanmukh Kali Prasad', batch: 0 },
        { name: 'Meghna Chintalpudi', batch: 0 },
        { name: 'Swetha Mamidipoodi', batch: 0 },
        { name: 'Harsha Sinha', batch: 0 },
        { name: 'Tushar Kanth', batch: 0 },
        { name: 'Archana Swaminathan', batch: 0 },
        { name: 'Kaushik Sathishkumar', batch: 0 },
        { name: 'Tarun Agrawal', batch: 0 },
        { name: 'Asha Cherukuri', batch: 0 },
        { name: 'Sriya Suri', batch: 0 },
        { name: 'Aishwarya Rebelly', batch: 0 },
        { name: 'Raghavendra Challawar', batch: 0 },
        { name: 'Sanath Salil', batch: 0 },
        { name: 'Anudeep Reddy', batch: 0 },
        { name: 'Tejas Vaid', batch: 0 },
        { name: 'Adarsh Mishra', batch: 0 },
        { name: 'Chatrik Singh Mangat', batch: 0 },
        { name: 'Mohammed Burk', batch: 0 },
        { name: 'Akshay Tiwari', batch: 0 },
        { name: 'Harsha Sista', batch: 0 },
        { name: 'Abhinav Krishnan', batch: 0 },
        { name: 'Niharika Shankar', batch: 0 },
        { name: 'Vamsi BG', batch: 0 },
        { name: 'Mrunalini Ramnath', batch: 0 },
        { name: 'Rohit Dwivedula', batch: 0 },
        { name: 'Aditya Gayatri Sastry Kaipa', batch: 0 },
        { name: 'Siddharth Sampath', batch: 0 },
        { name: 'Shashank Sistla', batch: 0 },
        { name: 'Abhimanyu Dasgupta', batch: 0 },
        { name: 'Poornima Venkatapuram', batch: 0 },
        { name: 'Shreyam Kumar', batch: 0 },
        { name: 'Jaya Pavan Yalamati', batch: 0 },
        { name: 'Eishita Tripathi', batch: 0 },
        { name: 'Shuddhabho Nandi', batch: 0 },
        { name: 'Adithya Warrier', batch: 0 },
        { name: 'Yogitha Garlapati', batch: 0 },
        { name: 'Maithree Venkatesan', batch: 0 },
        { name: 'Saandra Nandakumar', batch: 0 },
        { name: 'Venkata Tharun Gangula', batch: 0 },
        { name: 'Ishita Gupta', batch: 0 },
        { name: 'Sharique Creates', batch: 0 },
        { name: 'Akshitha Reddy', batch: 0 } ];
    return data;
}

const get_data = () => {
    const json_files = [];
    const files = fs.readdirSync('./jc-old');
    files.forEach(e => {
        const m = require(`./jc-old/${e}`);
        json_files.push(m);

    });
    all_participants = json_files[0].participants;
    all_participants = all_participants.map(e => {
        e.batch = 0;
        return e;
    });
    all_messages = [];
    json_files.forEach(e => {
        all_messages.push(...e.messages);
    });
    return {
        people: all_participants,
        messages: all_messages,
    };
}

const get_messages_by_user = (user, messages) => {
    let subset = messages.filter(e => e.sender_name == user.name);
    return subset;
}

const get_people_by_message_count = (people, messages) => {
    let p = people.map(a => ({...a}));
    p.messages = [];
    p = p.map(e => {
        const m = get_messages_by_user(e, messages);
        e.messages = m;
        return e;
    });
    p = p.sort((a, b) => {
        return b.messages.length - a.messages.length;
    });
    return p;
};

const print_people_list = (people, limit) => {
    let list = people.slice();
    if (limit) {
        list = list.slice(0, 1 * limit)
    }
    list.forEach((e, index) => {
        console.log(`${index + 1}\t${e.messages.length}\t${e.name}`);
    });
}

const print_person = (people, name) => {
    p = people.find(e => e.name == name);
    console.log(p);
}

let stats = {};

const store_and_print_list = (stat_name, people, messages, limit=20) => {
    const data = get_people_by_message_count(people, messages);
    stats[stat_name] = data;
    console.log(`====================================\n${stat_name}\n`);
    print_people_list(data, limit);
};

const main = () => {
    let {people, messages} = get_data();
    const content_messages = messages.filter(e => {
        const is_nick_message = e.content && e.content.indexOf(' set the nickname for ') !== -1;
        return !is_nick_message;
    });
    const gif_messages = messages.filter(e => {
        const is_gif = e.gifs && e.gifs.length > 0;
        return is_gif;
    });

    const photo_messages = messages.filter(e => {
        const is_photo = e.photos && e.photos.length > 0;
        return is_photo;
    });

    const swear_messages = messages.filter(e => {
        // Use wordlist from https://github.com/MauriceButler/badwords
        const badwords = require('badwords/regexp');
        const hindiregex = new RegExp('\b' + hindi_words.join("|") + '\b', 'gi');
        const is_bad = e.content && (badwords.test(e.content) || hindiregex.test(e.content));
        return is_bad;
    });

    store_and_print_list('top_messagers', people, content_messages);
    store_and_print_list('gif_offenders', people, gif_messages);
    store_and_print_list('photo_people', people, photo_messages);
    store_and_print_list('top_foul_mouthed', people, swear_messages);
    return stats; // JSON stats. Maybe draw some graphs or paint a rainbow with these.
}

main();
