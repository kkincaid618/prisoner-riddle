import random

def generate_boxes(num_boxes):
    value_arr = list(range(num_boxes))
    random.shuffle(value_arr)

    return value_arr

def simulate_selections(value_arr):
    max_loop = 0

    for prisoner_num in range(len(value_arr)):
        counter = 0
        found_value = -1

        box = prisoner_num

        while found_value != prisoner_num:
            found_value = value_arr[box]
            box = found_value
            counter = counter + 1

            if found_value == prisoner_num:
                if counter > max_loop:
                    max_loop = counter

                break

    
    if max_loop > 50:
        success = False
    else:
        success = True
    
    return success

def iterate_selections(num_boxes, num_trials):

    if not isinstance(num_boxes,int):
        raise TypeError("num_boxes input value is not of type integer")
    
    if not isinstance(num_trials,int):
        raise TypeError("num_trials input value is not of type integer")


    successes = 0

    for trial in range(num_trials):    
        box_values = generate_boxes(num_boxes)
        trial_result = simulate_selections(box_values)

        if trial_result == True:
            successes = successes + 1

    success_rate = round(successes/num_trials*100,2)
    print(f'The prisoners succeeded in {success_rate}% ({successes} out of {num_trials} trials) with {num_boxes} boxes')

def main():
    iterate_selections(100,1000)

if __name__ == "__main__":
    main()