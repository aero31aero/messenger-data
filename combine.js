const fs = require('fs');

const hindi_words = 'aand,aandu,balatkar,balatkari,behen chod,beti chod,bhadva,bhadve,bhandve,bhangi,bhootni ke,bhosad,bhosadi ke,boobe,chakke,chinaal,chinki,chod,chodu,chodu bhagat,chooche,choochi,choope,choot,choot ke baal,chootia,chootiya,chuche,chuchi,chudaap,chudai khanaa,chudam chudai,chude,chut,chut ka chuha,chut ka churan,chut ka mail,chut ke baal,chut ke dhakkan,chut maarli,chutad,chutadd,chutan,chutia,chutiya,gaand,gaandfat,gaandmasti,gaandufad,gandfattu,gandu,gashti,gasti,ghassa,ghasti,gucchi,gucchu,harami,haramzade,hawas,hawas ke pujari,hijda,hijra,jhant,jhant chaatu,jhant ka keeda,jhant ke baal,jhant ke pissu,jhantu,kamine,kaminey,kanjar,kutta,kutta kamina,kutte ki aulad,kutte ki jat,kuttiya,loda,lodu,lund,lund choos,lund ka bakkal,lund khajoor,lundtopi,lundure,maa ki chut,maal,madar chod,mooh mein le,mutth,mutthal,najayaz,najayaz aulaad,najayaz paidaish,paki,pataka,patakha,raand,randaap,randi,randi rona,saala,saala kutta,saali kutti,saali randi,suar,suar ke lund,suar ki aulad,tatte,tatti,teri maa ka bhosada,teri maa ka boba chusu,teri maa ki behenchod ,teri maa ki chut,tharak,tharki,tu chuda'.split(',');

const get_participant_map = () => {
    const data = [
        { name: 'Rohitt Vashishtha', batch: 2015 },
        { name: 'Karthik Nagaraj', batch: 2016 },
        { name: 'Ramana Sriram', batch: 2018 },
        { name: 'Monith Sourya', batch: 2016 },
        { name: 'Ananya Mohapatra', batch: 2018 },
        { name: 'Shanmukh Nama', batch: 2016 },
        { name: 'Musaiyab Ali Mirza', batch: 2016 },
        { name: 'Kushagra K Chanda', batch: 2015 },
        { name: 'Viswanatha Kasyap Pasumarthy', batch: 2015 },
        { name: 'Sandeep Jimmy', batch: 2017 },
        { name: 'Vedika Kulkarni', batch: 2017 },
        { name: 'Manish Kumar', batch: 0 },
        { name: 'Vamsi Nallapareddy', batch: 2017 },
        { name: 'Chellapilla Shri Akhil', batch: 2015 },
        { name: 'Rushabh Musthyala', batch: 2018 },
        { name: 'Vinith Bhandari', batch: 2016 },
        { name: 'Tushar Aggarwal', batch: 2017 },
        { name: 'Paavani Khanna', batch: 0 },
        { name: 'Shreejee Agarwal', batch: 0 },
        { name: 'Nivedan Vishwanath', batch: 2018 },
        { name: 'Prajjwal Vijaywargiya', batch: 0 },
        { name: 'Aditya Ramaswami', batch: 2016 },
        { name: 'Triyasha Ghosh Dastidar', batch: 2017 },
        { name: 'Suhita Saha', batch: 2015 },
        { name: 'Venkatesh Jaya', batch: 0 },
        { name: 'Palak Oswal', batch: 2015 },
        { name: 'Nikita Mandapati', batch: 2015 },
        { name: 'Shanmukh Kali Prasad', batch: 2017 },
        { name: 'Meghna Chintalpudi', batch: 0 },
        { name: 'Swetha Mamidipoodi', batch: 0 },
        { name: 'Harsha Sinha', batch: 2017 },
        { name: 'Tushar Kanth', batch: 2015 },
        { name: 'Archana Swaminathan', batch: 2016 },
        { name: 'Kaushik Sathishkumar', batch: 0 },
        { name: 'Tarun Agrawal', batch: 2018 },
        { name: 'Asha Cherukuri', batch: 0 },
        { name: 'Sriya Suri', batch: 2017 },
        { name: 'Aishwarya Rebelly', batch: 2016 },
        { name: 'Raghavendra Challawar', batch: 2017 },
        { name: 'Sanath Salil', batch: 2018 },
        { name: 'Anudeep Reddy', batch: 2018 },
        { name: 'Tejas Vaid', batch: 2017 },
        { name: 'Adarsh Mishra', batch: 2018 },
        { name: 'Chatrik Singh Mangat', batch: 0 },
        { name: 'Mohammed Burk', batch: 2017 },
        { name: 'Akshay Tiwari', batch: 2018 },
        { name: 'Harsha Sista', batch: 2016 },
        { name: 'Abhinav Krishnan', batch: 0 },
        { name: 'Niharika Shankar', batch: 2017 },
        { name: 'Vamsi BG', batch: 0 },
        { name: 'Mrunalini Ramnath', batch: 2017 },
        { name: 'Rohit Dwivedula', batch: 2017 },
        { name: 'Aditya Gayatri Sastry Kaipa', batch: 2017 },
        { name: 'Siddharth Sampath', batch: 2017 },
        { name: 'Shashank Sistla', batch: 2017 },
        { name: 'Abhimanyu Dasgupta', batch: 2017 },
        { name: 'Poornima Venkatapuram', batch: 2017 },
        { name: 'Shreyam Kumar', batch: 2017 },
        { name: 'Jaya Pavan Yalamati', batch: 0 },
        { name: 'Eishita Tripathi', batch: 2018 },
        { name: 'Shuddhabho Nandi', batch: 2018 },
        { name: 'Adithya Warrier', batch: 2018 },
        { name: 'Yogitha Garlapati', batch: 2018 },
        { name: 'Maithree Venkatesan', batch: 2018 },
        { name: 'Saandra Nandakumar', batch: 2018 },
        { name: 'Venkata Tharun Gangula', batch: 2018 },
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
    all_participants = get_participant_map()
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
    p = p.map(e => {
        const m = get_messages_by_user(e, messages);
        // e.messages = m;
        e.count = m.length;
        return e;
    });
    p = p.sort((a, b) => {
        return b.count - a.count;
    });
    return p;
};

const get_people_by_reaction_count = (people, messages) => {
    let p = people.map(a => ({...a}));
    p = people.map(a => {
        a.count = 0;
        return a;
    });
    messages.forEach(m => {
        if (m.reactions) {
            m.reactions.forEach(r => {
                const foundIndex = people.findIndex(x => x.name == r.actor);
                if (foundIndex !== -1) {
                    people[foundIndex].count++;
                }
            });
        }
    });
    p = p.sort((a, b) => {
        return b.count - a.count;
    });
    return p;
};

const get_people_by_popularity_count = (people, messages) => {
    let p = people.map(a => ({...a}));
    p = people.map(a => {
        a.count = 0;
        return a;
    });
    messages.forEach(m => {
        if (m.reactions) {
            const foundIndex = p.findIndex(x => x.name == m.sender_name);
            if (foundIndex !== -1) {
                p[foundIndex].count+=m.reactions.length;
            }
        }
    });
    p = p.sort((a, b) => {
        return b.count - a.count;
    });
    return p;
};

const print_people_list = (people, limit, other_name="Everyone Else", fixed=false) => {
    let list = people.slice();
    let remaining = [];
    if (limit || limit == 0) {
        remaining = list.slice(limit);
        list = list.slice(0, 1 * limit)
    }
    list.forEach((e, index) => {
        const count = fixed ? e.count.toFixed(5) : e.count;
        console.log(`${index + 1}\t${count}\t${e.name}`);
    });
    if (limit !== 0 && !limit) return;
    if (fixed) return;
    let sum = 0;
    remaining.forEach(e => {
        sum += e.count;
    });
    console.log(`${limit + 1}\t${sum}\t${other_name}`);
}

const print_person = (people, name) => {
    p = people.find(e => e.name == name);
    console.log(p);
}

let stats = {};

const print_stat_by_batch = (stat_name) => {
    let data = stats[stat_name];
    console.log(`\n====================================\n${stat_name} by batch\n`);
    const batches = [2015, 2016, 2017, 2018];
    batches.forEach(batch => {
        const new_data = data.filter(e => {
            return e.batch == batch;
        });
        print_people_list(new_data, 0, `Batch: ${batch}`);
    });
}

const store_and_print_list = (stat_name, people, messages, limit=20, other_name='Everyone Else') => {
    let data = get_people_by_message_count(people, messages);
    if (stat_name.indexOf('react') > -1) {
        data = get_people_by_reaction_count(people, messages);
    }
    if (stat_name.indexOf('popular') > -1) {
        data = get_people_by_popularity_count(people, messages);
    }
    stats[stat_name] = data;
    console.log(`\n====================================\n${stat_name}\n`);
    print_people_list(data, limit, other_name);
};

print_per_message_stats = (stat_name) => {
    let data = stats[stat_name];
    let msgs = stats.top_messagers;
    msgs = msgs.slice(0,25);
    data = data.map(a => ({...a}));
    data = data.filter(e => e.batch > 0);
    data = data.map(e => {
        person_msgs = msgs.find(f=> f.name == e.name);
        if (!person_msgs) return;
        msgs_count = person_msgs.count;
        e.count = e.count/msgs_count;
        return e;
    });
    data = data.sort((a, b) => {
        if (a.count == NaN) a.count = 0;
        if (b.count == NaN) b.count = 0;
        return b.count - a.count;
    });
    stats[`${stat_name}_per_message`] = data;
    console.log(`\n====================================\n${stat_name}_per_message\n`);
    print_people_list(data, 25, "Everone Else", true);
}

const main = () => {
    let {people, messages} = get_data();
    const content_messages = messages.filter(e => {
        const is_nick_message = e.content && e.content.indexOf(' set the nickname for ') !== -1;
        return !is_nick_message;
    });

    const nick_messages = messages.filter(e => {
        const is_nick_message = e.content && e.content.indexOf(' set the nickname for ') !== -1;
        return is_nick_message;
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

    const no_u_messages = messages.filter(e => {
        const valid = e.content && e.content.toLowerCase().indexOf('no u') > -1;
        return valid;
    });

    const left_messages = messages.filter(e => {
        const valid = e.type === 'Unsubscribe';
        return valid;
    });

    store_and_print_list('top_messagers', people, content_messages);
    store_and_print_list('gif_offenders', people, gif_messages);
    store_and_print_list('photo_people', people, photo_messages);
    store_and_print_list('top_foul_mouthed', people, swear_messages);
    store_and_print_list('basic_no_u_responders', people, no_u_messages);
    store_and_print_list('nick_changers', people, nick_messages);
    store_and_print_list('highly_reactive', people, content_messages);
    store_and_print_list('quiters', people, left_messages);
    store_and_print_list('popular_folks', people, content_messages);
    print_stat_by_batch('top_messagers');
    print_stat_by_batch('gif_offenders');
    print_stat_by_batch('photo_people');
    print_stat_by_batch('top_foul_mouthed');
    print_stat_by_batch('basic_no_u_responders');
    print_stat_by_batch('nick_changers');
    print_stat_by_batch('highly_reactive');
    print_stat_by_batch('quiters');
    print_stat_by_batch('popular_folks');
    print_per_message_stats('photo_people');
    print_per_message_stats('top_foul_mouthed');
    print_per_message_stats('popular_folks');
    fs.writeFileSync('./stats.json', JSON.stringify(stats, null, 4));
    return stats; // JSON stats. Maybe draw some graphs or paint a rainbow with these.
}

main();
