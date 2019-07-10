

def print_org(a_list):
    print("{:<7}{:<10}{:<15}{:<10}{:>10}".format(
        "Name", "Speed", "Metabolism", "Life", "Age"))
    for o in a_list:
        print("{:<7}".format(o.org_name),
             "{:<10}".format(o.speed),
             "{:<15}".format(o.metabolism),
             "{:<10}".format(o.life),
             "{:>10}".format(o.age)
             )